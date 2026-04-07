# استخدام نسخة Node.js 18
FROM node:18-alpine

# تحديد مجلد العمل
WORKDIR /app

# نسخ الملفات المبنية
COPY dist ./dist

# تحديد المنفذ
EXPOSE 8080

# متغير البيئة للمنفذ
ENV PORT=8080
ENV NODE_ENV=production

# أمر التشغيل
CMD ["node", "dist/main.js"]
