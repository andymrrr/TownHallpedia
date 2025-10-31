import { plainToClass, Transform } from 'class-transformer';
import { IsString, IsNumber, IsBoolean, IsOptional, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  @IsOptional()
  NODE_ENV?: string;

  @IsNumber()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return 3000; // Valor por defecto
    }
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 3000 : parsed;
  })
  PORT: number;

  @IsString()
  @IsOptional()
  DB_HOST?: string;

  @IsNumber()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return 5432; // Valor por defecto
    }
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 5432 : parsed;
  })
  DB_PORT: number;

  @IsString()
  @IsOptional()
  DB_USERNAME?: string;

  @IsString()
  @IsOptional()
  DB_PASSWORD?: string;

  @IsString()
  @IsOptional()
  DB_DATABASE?: string;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return false;
    }
    return value === 'true' || value === true;
  })
  DB_SYNCHRONIZE: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return false;
    }
    return value === 'true' || value === true;
  })
  DB_LOGGING: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return false;
    }
    return value === 'true' || value === true;
  })
  DB_MIGRATIONS_RUN: boolean;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
