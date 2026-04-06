import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AddPaymentDto } from './dto/add-payment.dto';
import { InvoiceFilterQueryDto } from './dto/invoice-filter-query.dto';
import { CurrentUserPayload } from '../../common/decorators/current-user.decorator';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    findAll(query: InvoiceFilterQueryDto, user?: CurrentUserPayload): Promise<Record<string, unknown>>;
    create(dto: CreateInvoiceDto, user?: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/invoice.schema").Invoice> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    update(id: string, dto: UpdateInvoiceDto, user?: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/invoice.schema").Invoice> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string, user?: CurrentUserPayload): Promise<void>;
    listPayments(id: string, user?: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/invoice-payment.schema").InvoicePayment> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    addPayment(id: string, dto: AddPaymentDto, user?: CurrentUserPayload): Promise<(import("mongoose").FlattenMaps<import("./schemas/invoice-payment.schema").InvoicePayment> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    deletePayment(invoiceId: string, paymentId: string, user?: CurrentUserPayload): Promise<void>;
    updatePayment(invoiceId: string, paymentId: string, dto: AddPaymentDto, user?: CurrentUserPayload): Promise<import("./schemas/invoice-payment.schema").InvoicePayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
