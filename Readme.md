# 🏛️ TownHallpedia

<div align="center">

![TownHallpedia](https://img.shields.io/badge/TownHallpedia-Clash%20of%20Clans-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-0.0.1-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-UNLICENSED-red?style=for-the-badge)

**Una aplicación completa de referencia para Clash of Clans**

[Características](#-características) • [Tecnologías](#-tecnologías) • [Instalación](#-instalación) • [Documentación](#-documentación)

</div>

---

## ⚠️ Aviso Importante

<div align="center">

### 🚫 **Este proyecto NO es oficial de Clash of Clans**

**TownHallpedia** es un proyecto **no oficial** y **independiente** creado por la comunidad. Este proyecto no está afiliado, asociado, autorizado, respaldado o patrocinado de ninguna manera por **Supercell** o **Clash of Clans**.

- ❌ No es una aplicación oficial de Supercell
- ❌ No está respaldado por Supercell
- ✅ Es un proyecto de código abierto de la comunidad
- ✅ Creado con fines educativos y de referencia

**Clash of Clans** es una marca registrada de **Supercell Oy**. Todos los derechos reservados.

</div>

---

## 📖 Descripción

**TownHallpedia** es una aplicación web y móvil completa que proporciona una base de datos integral de información del juego Clash of Clans. Permite a los jugadores consultar información detallada sobre:

- 🏛️ **Ayuntamientos** - Niveles, capacidades y costos
- 🏗️ **Edificios** - Tipos, mejoras y desbloqueos
- ⚔️ **Tropas** - Estadísticas, niveles y requisitos
- 🦸 **Héroes** - Habilidades, mejoras y desbloqueos
- 🔮 **Hechizos** - Tipos, niveles y efectos
- 🐾 **Animales** - Información y características

El proyecto está construido con una arquitectura moderna, escalable y completamente tipada, siguiendo las mejores prácticas de desarrollo.

---

## ✨ Características

### 🎯 Funcionalidades Principales

- 📱 **Aplicación Móvil** - Interfaz nativa para iOS y Android con React Native/Expo
- 🌐 **API RESTful** - Backend robusto con NestJS y PostgreSQL
- 🔍 **Búsqueda Avanzada** - Búsqueda rápida y filtrado de contenido
- 📊 **Información Detallada** - Estadísticas completas de todas las entidades del juego
- 🔓 **Sistema de Desbloqueos** - Visualización de requisitos de desbloqueo por nivel de ayuntamiento
- 📄 **Paginación** - Navegación eficiente de grandes conjuntos de datos
- 🎨 **UI Moderna** - Interfaz intuitiva y responsive

### 🏗️ Arquitectura

- **Arquitectura en Capas** - Separación clara de responsabilidades
- **Clean Architecture** - Principios SOLID y patrones de diseño
- **TypeScript Completo** - 100% tipado en todo el proyecto
- **Domain-Driven Design** - Modelado basado en el dominio del negocio
- **Use Cases** - Lógica de negocio encapsulada en casos de uso

---

## 🛠️ Tecnologías

### Frontend

- **React Native** - Framework para aplicaciones móviles
- **Expo** - Plataforma de desarrollo y despliegue
- **TypeScript** - Tipado estático
- **React Query** - Gestión de estado del servidor
- **Expo Router** - Navegación basada en archivos

### Backend

- **NestJS** - Framework Node.js progresivo
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Base de datos relacional
- **Swagger/OpenAPI** - Documentación automática de API
- **class-validator** - Validación de datos
- **class-transformer** - Transformación de objetos

---

## 📁 Estructura del Proyecto

```
TownHallpedia/
├── Frontend/          # Aplicación móvil React Native/Expo
│   ├── app/          # Pantallas y navegación
│   ├── components/   # Componentes reutilizables
│   ├── core/         # Lógica de negocio y API
│   ├── features/     # Módulos de funcionalidades
│   └── hooks/        # Custom hooks
│
├── Backend/          # API RESTful con NestJS
│   ├── src/
│   │   ├── presentation/    # Controladores y DTOs
│   │   ├── application/     # Servicios y casos de uso
│   │   ├── domain/          # Entidades de dominio e interfaces
│   │   └── infrastructure/  # Persistencia y servicios externos
│   └── test/         # Tests
│
└── README.md         # Este archivo
```

---

## 🚀 Instalación

### Prerrequisitos

- **Node.js** (v18 o superior)
- **PostgreSQL** (v12 o superior)
- **npm** o **yarn**
- **Expo CLI** (para desarrollo móvil)

### Configuración Rápida

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd TownHallpedia
```

2. **Configurar Backend**

```bash
cd Backend
npm install

# Crear archivo .env con las variables de entorno
cp .env.example .env  # Editar con tus credenciales

# Ejecutar migraciones
npm run migration:run

# Iniciar servidor de desarrollo
npm run start:dev
```

📖 **Documentación completa del Backend**: [Backend/README.md](./Backend/README.md)

3. **Configurar Frontend**

```bash
cd Frontend
npm install

# Iniciar aplicación
npm start
```

📖 **Documentación completa del Frontend**: [Frontend/README.md](./Frontend/README.md)

---

## 📚 Documentación

### Documentación por Componente

- 📱 **[Frontend README](./Frontend/README.md)** - Guía completa de la aplicación móvil

  - Estructura del proyecto
  - Configuración y desarrollo
  - Componentes y features
  - Testing y despliegue

- 🔧 **[Backend README](./Backend/README.md)** - Guía completa de la API
  - Arquitectura en capas
  - Endpoints disponibles
  - Configuración de base de datos
  - Migraciones y seeds
  - Documentación Swagger

### API Documentation

Una vez que el backend esté ejecutándose, puedes acceder a:

- **Swagger UI**: http://localhost:3000/api/docs
- **API Base**: http://localhost:3000

---

## 🎯 Características Técnicas

### Backend

- ✅ **Arquitectura en Capas Mejorada**

  - Capa de Presentación (Controllers, DTOs)
  - Capa de Aplicación (Services, Use Cases)
  - Capa de Dominio (Entities, Interfaces)
  - Capa de Infraestructura (Persistence, External Services)

- ✅ **TypeScript Completo**

  - 100% tipado en todo el código
  - Sin uso de `any` (excepto casos necesarios)
  - Tipos específicos para todas las entidades

- ✅ **Validación y Transformación**

  - Validación automática con DTOs
  - Transformación de tipos
  - Manejo de errores estandarizado

- ✅ **Base de Datos**
  - Migraciones versionadas
  - Sistema de seed para datos iniciales
  - Relaciones bien definidas

### Frontend

- ✅ **Arquitectura Clean**

  - Separación de concerns
  - Use Cases para lógica de negocio
  - ViewModels para estado de UI

- ✅ **TypeScript Completo**

  - Tipado en todos los componentes
  - Interfaces bien definidas
  - Type safety en toda la aplicación

- ✅ **Gestión de Estado**
  - React Query para datos del servidor
  - Estado local con hooks
  - Caché inteligente

---

## 🧪 Testing

### Backend

```bash
cd Backend
npm run test              # Tests unitarios
npm run test:e2e          # Tests end-to-end
npm run test:cov          # Coverage
```

### Frontend

```bash
cd Frontend
npm test                  # Tests unitarios
```

---

## 📦 Scripts Principales

### Backend

```bash
npm run start:dev         # Desarrollo con hot-reload
npm run build             # Compilar para producción
npm run start:prod        # Ejecutar en producción
npm run migration:run     # Ejecutar migraciones
```

### Frontend

```bash
npm start                 # Iniciar Expo
npm run android           # Ejecutar en Android
npm run ios               # Ejecutar en iOS
npm run web               # Ejecutar en web
```

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código establecidas
- Añade tests para nuevas funcionalidades
- Actualiza la documentación según sea necesario
- Mantén el código tipado al 100%

---

## 📄 Licencia

Este proyecto está bajo la Licencia **UNLICENSED**.

---

## 👥 Autores

- **Tu Nombre** - [@tu-usuario](https://github.com/tu-usuario)

---

## 🙏 Créditos y Agradecimientos

### 🎮 Juego Original

- **Supercell Oy** - Creadores de **Clash of Clans**
  - Clash of Clans es una marca registrada de Supercell Oy
  - Todos los derechos del juego pertenecen a Supercell
  - Este proyecto no está afiliado con Supercell

### 🛠️ Tecnologías y Frameworks

- **NestJS Team** - Por el excelente framework Node.js
- **Expo Team** - Por las herramientas de desarrollo móvil
- **React Native Team** - Por el framework de aplicaciones móviles
- **TypeORM Team** - Por el ORM para TypeScript
- **React Query Team** - Por la gestión de estado del servidor

### 🌟 Comunidad

- **Comunidad Open Source** - Por todas las librerías y herramientas utilizadas
- **Comunidad de Clash of Clans** - Por la inspiración y feedback
- **Contribuidores del Proyecto** - Por hacer este proyecto posible

### 📝 Nota Legal

Este proyecto utiliza información y referencias de Clash of Clans con fines educativos y de referencia únicamente. Todos los derechos de Clash of Clans, incluyendo personajes, nombres, imágenes y contenido del juego, son propiedad de Supercell Oy. Este proyecto no busca infringir ningún derecho de autor y está destinado únicamente para uso educativo y de referencia por parte de la comunidad.

---

## 📞 Soporte

Para soporte, por favor:

- 📧 Email: [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/townhallpedia/issues)
- 💬 Discusiones: [GitHub Discussions](https://github.com/tu-usuario/townhallpedia/discussions)

---

## 🔗 Enlaces Útiles

- [Documentación NestJS](https://docs.nestjs.com)
- [Documentación TypeORM](https://typeorm.io)
- [Documentación Expo](https://docs.expo.dev)
- [Documentación React Native](https://reactnative.dev)
- [Clash of Clans Wiki](https://clashofclans.fandom.com)

---

## ⚖️ Aviso Legal

Este proyecto es **NO OFICIAL** y **NO está afiliado con Supercell Oy o Clash of Clans**.

- **Clash of Clans** es una marca registrada de **Supercell Oy**
- Todos los derechos del juego pertenecen a **Supercell Oy**
- Este proyecto es de código abierto y se proporciona "tal cual" sin garantías
- El uso de este proyecto es bajo tu propia responsabilidad
- Este proyecto no busca infringir ningún derecho de autor

Para más información sobre Clash of Clans, visita: [supercell.com](https://supercell.com)

---

<div align="center">

**Hecho con ❤️ para la comunidad de Clash of Clans**

⭐ Si te gusta este proyecto, dale una estrella!

**⚠️ Recuerda: Este proyecto NO es oficial de Clash of Clans**

</div>
