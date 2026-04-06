# استخدام نسخة Node.js 18
FROM node:18-alpine AS builder

# تثبيت أدوات البناء الضرورية
RUN apk add --no-cache python3 make g++

# تحديد مجلد العمل
WORKDIR /app

# نسخ ملفات package للاستفادة من Docker cache
COPY package*.json ./

# تثبيت جميع التبعيات (بما فيها devDependencies للبناء)
RUN npm ci

# نسخ باقي الملفات
COPY . .

# بناء المشروع
RUN npm run build

# مرحلة الإنتاج - صورة أصغر
FROM node:18-alpine

WORKDIR /app

# نسخ package files
COPY package*.json ./

# تثبيت التبعيات الإنتاجية فقط
RUN npm ci --only=production && npm cache clean --force

# نسخ الملفات المبنية من المرحلة السابقة
COPY --from=builder /app/dist ./dist

# تحديد المنفذ
EXPOSE 8080

# متغير البيئة للمنفذ
ENV PORT=8080
ENV NODE_ENV=production

# أمر التشغيل
CMD ["node", "dist/main.js"]
