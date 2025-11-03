/**
 * Resultado de la ejecución del seed
 */
export interface SeedExecutionResult {
  ayuntamientos: number;
  edificios: number;
  heroes: number;
  hechizos: number;
  tropas: number;
  desbloqueos: number;
  nivelesDetalle: number;
  total: number;
  tiempoEjecucion: number;
}

/**
 * Estadísticas de ejecución del seed
 */
export interface SeedStatistics {
  inicio: Date;
  fin?: Date;
  duracion?: number;
  registrosCreados: number;
  registrosExistentes: number;
  errores: number;
}

/**
 * Opciones de configuración para la ejecución del seed
 */
export interface SeedOptions {
  /**
   * Si es true, valida los datos antes de insertarlos
   * @default true
   */
  validarDatos?: boolean;

  /**
   * Si es true, continúa ejecutando aunque haya errores en entidades individuales
   * @default false
   */
  continuarConErrores?: boolean;

  /**
   * Tamaño del lote para procesamiento en batch
   * @default 50
   */
  batchSize?: number;

  /**
   * Si es true, registra información detallada de la ejecución
   * @default true
   */
  logging?: boolean;
}




