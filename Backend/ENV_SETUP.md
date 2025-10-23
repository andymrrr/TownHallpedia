# 🔧 Configuración de Variables de Entorno

## 📋 Archivo `.env` Requerido

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
# ========================================
# 🗄️ CONFIGURACIÓN DE BASE DE DATOS
# ========================================
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password_seguro
DB_DATABASE=townhallpedia

# ========================================
# ⚙️ CONFIGURACIÓN DE TIPO DE ENTORNO
# ========================================
NODE_ENV=development

# ========================================
# 🔧 CONFIGURACIÓN DE TYPEORM
# ========================================
# ⚠️ IMPORTANTE: NO usar synchronize=true en producción
DB_SYNCHRONIZE=false
DB_LOGGING=false
DB_MIGRATIONS_RUN=false

# ========================================
# 🌐 CONFIGURACIÓN DE APLICACIÓN
# ========================================
PORT=3000

# ========================================
# 🔐 CONFIGURACIÓN DE SEGURIDAD (FUTURO)
# ========================================
# JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
# JWT_EXPIRES_IN=24h
```

## 🚀 Configuraciones por Entorno

### **Desarrollo** (`.env`)

```env
NODE_ENV=development
DB_SYNCHRONIZE=false
DB_LOGGING=true
DB_MIGRATIONS_RUN=false
```

### **Producción** (`.env.production`)

```env
NODE_ENV=production
DB_SYNCHRONIZE=false
DB_LOGGING=false
DB_MIGRATIONS_RUN=true
```

### **Testing** (`.env.test`)

```env
NODE_ENV=test
DB_DATABASE=townhallpedia_test
DB_SYNCHRONIZE=true
DB_LOGGING=false
```

## 🔒 Seguridad

### **Variables Sensibles**

- `DB_PASSWORD`: Contraseña de la base de datos
- `JWT_SECRET`: Clave secreta para JWT
- `DB_HOST`: Host de la base de datos (en producción)

### **Buenas Prácticas**

1. **NUNCA** commitees el archivo `.env` al repositorio
2. Usa `.env.example` como plantilla
3. Cambia las contraseñas por defecto
4. Usa variables diferentes para cada entorno
5. Usa servicios como AWS Secrets Manager en producción

## 📁 Estructura de Archivos

```
├── .env                    # Variables de entorno (NO committear)
├── .env.example           # Plantilla de variables
├── .env.local             # Variables locales (opcional)
├── .env.production       # Variables de producción
└── .env.test            # Variables de testing
```

## 🛠️ Comandos de Configuración

```bash
# Copiar plantilla
cp .env.example .env

# Editar variables
nano .env

# Verificar configuración
npm run start:dev
```

## ⚠️ Advertencias Importantes

1. **DB_SYNCHRONIZE**: NUNCA usar `true` en producción
2. **DB_LOGGING**: Solo activar en desarrollo
3. **DB_MIGRATIONS_RUN**: Solo activar en producción
4. **Contraseñas**: Usar contraseñas seguras y únicas
5. **SSL**: Configurar SSL en producción

## 🔧 Configuración Avanzada

### **Pool de Conexiones**

```env
# Configuración automática en database.config.ts
DB_POOL_MAX=20
DB_POOL_MIN=5
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```

### **SSL en Producción**

```env
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

## 📚 Documentación Adicional

- [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)
- [TypeORM Configuration](https://typeorm.io/data-source-options)
- [PostgreSQL Connection](https://www.postgresql.org/docs/current/libpq-connect.html)
