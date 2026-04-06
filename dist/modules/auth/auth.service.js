"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("./schemas/user.schema");
const doctor_schema_1 = require("../doctors/schemas/doctor.schema");
const enums_1 = require("../../enums");
const objectid_1 = require("../../common/utils/objectid");
const auth_gateway_1 = require("./auth.gateway");
let AuthService = class AuthService {
    constructor(userModel, doctorModel, jwtService, configService, authGateway) {
        this.userModel = userModel;
        this.doctorModel = doctorModel;
        this.jwtService = jwtService;
        this.configService = configService;
        this.authGateway = authGateway;
    }
    async login(dto) {
        const user = await this.userModel
            .findOne({ email: dto.email.toLowerCase() })
            .select('+passwordHash')
            .lean();
        if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const token = this.jwtService.sign({
            sub: user._id.toString(),
            email: user.email,
            role: user.role,
            doctorId: user.doctorId?.toString(),
        }, { expiresIn: this.configService.get('jwt.expiresIn') || '7d' });
        const doctor = user.doctorId
            ? await this.doctorModel
                .findById(user.doctorId)
                .select('name nameAr specialty color role isOwner')
                .lean()
            : null;
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                doctorId: user.doctorId,
                avatar: user.avatar,
                permissions: {
                    canViewAllDoctors: user.role === enums_1.UserRole.Owner || user.role === enums_1.UserRole.Assistant,
                    canViewExpenses: user.role === enums_1.UserRole.Owner || user.role === enums_1.UserRole.Assistant,
                    canFilterByDoctor: user.role === enums_1.UserRole.Owner || user.role === enums_1.UserRole.Assistant,
                },
            },
            doctor: doctor ?? undefined,
        };
    }
    async getMe(userId) {
        const user = await this.userModel
            .findById(userId)
            .select('-passwordHash')
            .populate('doctorId', 'name nameAr specialty color role isOwner')
            .lean();
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return user;
    }
    async listUsers() {
        return this.userModel
            .find()
            .select('-passwordHash')
            .populate('doctorId', 'name nameAr specialty color role isOwner')
            .sort({ createdAt: -1 })
            .lean();
    }
    async register(dto) {
        const email = dto.email.toLowerCase().trim();
        const existing = await this.userModel.findOne({ email }).lean();
        if (existing) {
            throw new common_1.ConflictException('An account with this email already exists');
        }
        if ((dto.role === enums_1.UserRole.Doctor || dto.role === enums_1.UserRole.Assistant) &&
            dto.doctorId) {
            const doctor = await this.doctorModel.findById(dto.doctorId).lean();
            if (!doctor) {
                throw new common_1.BadRequestException('doctorId not found. Use GET /api/doctors to get valid doctor IDs. For admin/owner, omit doctorId.');
            }
        }
        if ((dto.role === enums_1.UserRole.Doctor || dto.role === enums_1.UserRole.Assistant) &&
            !dto.doctorId) {
            throw new common_1.BadRequestException('doctorId is required for doctor and assistant roles');
        }
        const rounds = this.configService.get('bcryptRounds') ?? 10;
        const passwordHash = await bcrypt.hash(dto.password, rounds);
        const user = await this.userModel.create({
            name: dto.name.trim(),
            email,
            passwordHash,
            role: dto.role,
            doctorId: dto.doctorId ? (0, objectid_1.toObjectIdOrThrow)(dto.doctorId, 'doctorId') : undefined,
            permissions: [],
        });
        const token = this.jwtService.sign({
            sub: user._id.toString(),
            email: user.email,
            role: user.role,
            doctorId: user.doctorId?.toString(),
        }, { expiresIn: this.configService.get('jwt.expiresIn') || '7d' });
        const doctor = user.doctorId
            ? await this.doctorModel
                .findById(user.doctorId)
                .select('name nameAr specialty color role isOwner')
                .lean()
            : null;
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            doctorId: user.doctorId,
            avatar: user.avatar,
            permissions: {
                canViewAllDoctors: user.role === enums_1.UserRole.Owner || user.role === enums_1.UserRole.Assistant,
                canViewExpenses: user.role === enums_1.UserRole.Owner || user.role === enums_1.UserRole.Assistant,
                canFilterByDoctor: user.role === enums_1.UserRole.Owner || user.role === enums_1.UserRole.Assistant,
            },
        };
        this.authGateway.emitUserCreated(userResponse);
        this.authGateway.emitUsersListUpdated();
        return {
            token,
            user: userResponse,
            doctor: doctor ?? undefined,
        };
    }
    async updateUser(userId, dto) {
        const id = (0, objectid_1.toObjectIdOrThrow)(userId, 'id');
        const existingUser = await this.userModel.findById(id);
        if (!existingUser)
            throw new common_1.BadRequestException('User not found');
        if (dto.email) {
            const email = dto.email.toLowerCase().trim();
            const duplicate = await this.userModel.findOne({ email, _id: { $ne: id } }).lean();
            if (duplicate)
                throw new common_1.ConflictException('An account with this email already exists');
            existingUser.email = email;
        }
        if (dto.name !== undefined)
            existingUser.name = dto.name.trim();
        if (dto.role !== undefined)
            existingUser.role = dto.role;
        if ((existingUser.role === enums_1.UserRole.Doctor || existingUser.role === enums_1.UserRole.Assistant) && !dto.doctorId && !existingUser.doctorId) {
            throw new common_1.BadRequestException('doctorId is required for doctor and assistant roles');
        }
        if (dto.doctorId !== undefined) {
            if (dto.doctorId) {
                const doctor = await this.doctorModel.findById(dto.doctorId).lean();
                if (!doctor) {
                    throw new common_1.BadRequestException('doctorId not found. Use GET /api/doctors to get valid doctor IDs.');
                }
                existingUser.doctorId = (0, objectid_1.toObjectIdOrThrow)(dto.doctorId, 'doctorId');
            }
            else {
                existingUser.doctorId = undefined;
            }
        }
        if ((existingUser.role === enums_1.UserRole.Doctor || existingUser.role === enums_1.UserRole.Assistant) && !existingUser.doctorId) {
            throw new common_1.BadRequestException('doctorId is required for doctor and assistant roles');
        }
        if (existingUser.role === enums_1.UserRole.Owner || existingUser.role === enums_1.UserRole.Admin) {
            existingUser.doctorId = undefined;
        }
        await existingUser.save();
        const updatedUser = await this.userModel
            .findById(id)
            .select('-passwordHash')
            .populate('doctorId', 'name nameAr specialty color role isOwner')
            .lean();
        this.authGateway.emitUserUpdated(updatedUser);
        this.authGateway.emitUsersListUpdated();
        return updatedUser;
    }
    async updateUserPassword(userId, dto) {
        const id = (0, objectid_1.toObjectIdOrThrow)(userId, 'id');
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const rounds = this.configService.get('bcryptRounds') ?? 10;
        user.passwordHash = await bcrypt.hash(dto.password, rounds);
        await user.save();
        return { message: 'Password updated successfully' };
    }
    async deleteUser(userId, currentUserId) {
        const id = (0, objectid_1.toObjectIdOrThrow)(userId, 'id');
        if (id.toString() === currentUserId) {
            throw new common_1.BadRequestException('You cannot delete your own account');
        }
        const deleted = await this.userModel.findByIdAndDelete(id).lean();
        if (!deleted)
            throw new common_1.BadRequestException('User not found');
        this.authGateway.emitUserDeleted(userId);
        this.authGateway.emitUsersListUpdated();
        return { message: 'User deleted successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService,
        auth_gateway_1.AuthGateway])
], AuthService);
//# sourceMappingURL=auth.service.js.map