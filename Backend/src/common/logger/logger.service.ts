import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

/**
 * Servicio de logging estructurado
 * Implementa la interfaz LoggerService de NestJS
 * 
 * En el futuro puede mejorarse con Winston o Pino para logging más avanzado
 */
@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: string, context?: string) {
    console.log(`[${new Date().toISOString()}] [${context || 'App'}] ${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    console.error(`[${new Date().toISOString()}] [${context || 'App'}] ERROR: ${message}`);
    if (trace) {
      console.error(`[${new Date().toISOString()}] [${context || 'App'}] TRACE: ${trace}`);
    }
  }

  warn(message: string, context?: string) {
    console.warn(`[${new Date().toISOString()}] [${context || 'App'}] WARN: ${message}`);
  }

  debug(message: string, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${new Date().toISOString()}] [${context || 'App'}] DEBUG: ${message}`);
    }
  }

  verbose(message: string, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${new Date().toISOString()}] [${context || 'App'}] VERBOSE: ${message}`);
    }
  }
}

