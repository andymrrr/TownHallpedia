/**
 * Excepción base para errores relacionados con el seed
 */
export class SeedException extends Error {
  constructor(
    message: string,
    public readonly context?: Record<string, unknown>,
    public readonly cause?: Error,
  ) {
    super(message);
    this.name = 'SeedException';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Excepción lanzada cuando falla la creación de una entidad durante el seed
 */
export class SeedEntityException extends SeedException {
  constructor(
    public readonly entityType: string,
    message: string,
    context?: Record<string, unknown>,
    cause?: Error,
  ) {
    super(`Error al crear ${entityType}: ${message}`, context, cause);
    this.name = 'SeedEntityException';
  }
}

/**
 * Excepción lanzada cuando falla una operación de base de datos durante el seed
 */
export class SeedDatabaseException extends SeedException {
  constructor(
    message: string,
    context?: Record<string, unknown>,
    cause?: Error,
  ) {
    super(`Error de base de datos en seed: ${message}`, context, cause);
    this.name = 'SeedDatabaseException';
  }
}








