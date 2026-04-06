# دليل النشر على Fly.io

## المتطلبات الأساسية

1. تثبيت Fly CLI:
```bash
# على macOS
brew install flyctl

# أو باستخدام curl
curl -L https://fly.io/install.sh | sh
```

2. تسجيل الدخول:
```bash
flyctl auth login
```

## خطوات النشر

### 1. إنشاء التطبيق (أول مرة فقط)

```bash
flyctl launch --no-deploy
```

سيسألك عن:
- اسم التطبيق (أو اضغط Enter لاسم عشوائي)
- المنطقة (اختر ams للقاهرة أو fra لأوروبا)
- قاعدة البيانات (اختر No - ستستخدم MongoDB الخارجي)

### 2. إعداد المتغيرات البيئية

```bash
# MongoDB URI
flyctl secrets set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/dbname"

# JWT Secret
flyctl secrets set JWT_SECRET="your-secret-key-here"

# أي متغيرات أخرى من ملف .env
flyctl secrets set VARIABLE_NAME="value"
```

### 3. النشر

```bash
flyctl deploy
```

### 4. فتح التطبيق

```bash
flyctl open
```

أو زيارة:
```
https://your-app-name.fly.dev
```

## الأوامر المفيدة

### عرض السجلات (Logs)
```bash
flyctl logs
```

### عرض حالة التطبيق
```bash
flyctl status
```

### إعادة التشغيل
```bash
flyctl apps restart
```

### عرض المتغيرات البيئية
```bash
flyctl secrets list
```

### الاتصال بـ SSH
```bash
flyctl ssh console
```

### حذف التطبيق
```bash
flyctl apps destroy your-app-name
```

## التحديثات المستقبلية

بعد أي تعديل في الكود:

```bash
# 1. بناء المشروع محلياً (اختياري للتأكد)
npm run build

# 2. النشر
flyctl deploy
```

## استكشاف الأخطاء

### إذا فشل البناء:
```bash
# بناء محلي للتأكد
docker build -t test .
docker run -p 8080:8080 test
```

### إذا لم يعمل التطبيق:
```bash
# فحص السجلات
flyctl logs

# فحص الحالة
flyctl status

# الدخول للحاوية
flyctl ssh console
```

### تغيير المنفذ:
إذا احتجت تغيير المنفذ، عدّل في:
- `fly.toml` → `internal_port`
- `Dockerfile` → `EXPOSE` و `ENV PORT`

## ملاحظات مهمة

1. التطبيق يستخدم المنفذ 8080 على Fly.io
2. Fly.io يوفر HTTPS تلقائياً
3. التطبيق سيتوقف تلقائياً عند عدم الاستخدام (auto_stop_machines)
4. سيبدأ تلقائياً عند أول طلب (auto_start_machines)
5. تأكد من إضافة جميع المتغيرات البيئية من `.env`

## الدعم

- [Fly.io Docs](https://fly.io/docs/)
- [NestJS Deployment](https://docs.nestjs.com/deployment)
