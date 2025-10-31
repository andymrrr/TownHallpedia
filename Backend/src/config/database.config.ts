import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    
    // Configuración de entidades
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    
    // Configuración de migraciones
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsRun: configService.get<boolean>('DB_MIGRATIONS_RUN', false),
    
    // Configuración de sincronización (NUNCA true en producción)
    synchronize: isProduction ? false : configService.get<boolean>('DB_SYNCHRONIZE', false),
    
    // Configuración de logging
    logging: configService.get<boolean>('DB_LOGGING', !isProduction),
    
    // Configuración de pool de conexiones
    extra: {
      max: 20, // Máximo de conexiones en el pool
      min: 5,  // Mínimo de conexiones en el pool
      acquire: 30000, // Tiempo máximo para adquirir conexión
      idle: 10000,   // Tiempo máximo de inactividad
      // Timeout de conexión para pg
      connectionTimeoutMillis: 10000,
    },
    
    // Configuración de SSL para producción
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  };
};
