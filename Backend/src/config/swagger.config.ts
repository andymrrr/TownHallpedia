import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('TownHallpedia API')
    .setDescription(`
      # 🏰 TownHallpedia API
      
      API RESTful completa para TownHallpedia - Base de datos integral de Clash of Clans.
      
      ## 📋 Características
      
      - **Gestión de Ayuntamientos**: Niveles 1-15 con capacidades y costos
      - **Gestión de Edificios**: Defensas, recursos y edificios militares
      - **Gestión de Tropas**: Tropas normales y oscuras con estadísticas
      - **Gestión de Héroes**: Héroes del juego con niveles de mejora
      - **Gestión de Hechizos**: Hechizos normales y oscuros
      - **Sistema de Niveles**: Detalles específicos por nivel de cada entidad
      - **Sistema de Desbloqueos**: Control de desbloqueos por ayuntamiento
      
      ## 🔧 Tecnologías
      
      - **NestJS**: Framework de Node.js
      - **TypeORM**: ORM para PostgreSQL
      - **Swagger**: Documentación automática
      - **Class Validator**: Validación de datos
      - **Clean Architecture**: Principios SOLID
      
      ## 🚀 Uso
      
      Esta API proporciona endpoints RESTful para gestionar toda la información del juego Clash of Clans.
      Cada endpoint está documentado con ejemplos de uso y respuestas.
    `)
    .setVersion('1.0.0')
    .setContact('TownHallpedia Team', 'https://townhallpedia.com', 'contact@townhallpedia.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addTag('Ayuntamientos', 'Gestión de niveles de ayuntamiento (1-15)')
    .addTag('Edificios', 'Gestión de edificios del juego')
    .addTag('Tropas', 'Gestión de tropas normales y oscuras')
    .addTag('Héroes', 'Gestión de héroes del juego')
    .addTag('Hechizos', 'Gestión de hechizos normales y oscuros')
    .addTag('Nivel Detalle', 'Gestión de detalles específicos por nivel')
    .addTag('Desbloqueos', 'Gestión de desbloqueos por ayuntamiento')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer('http://localhost:3000', 'Servidor de desarrollo')
    .addServer('https://api.townhallpedia.com', 'Servidor de producción')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showRequestHeaders: true,
      showCommonExtensions: true,
      docExpansion: 'none',
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
    },
    customSiteTitle: 'TownHallpedia API Documentation',
    customfavIcon: 'https://townhallpedia.com/favicon.ico',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #2c3e50; }
      .swagger-ui .scheme-container { background: #f8f9fa; padding: 10px; border-radius: 5px; }
    `,
  });
};
