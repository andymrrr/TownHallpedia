import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Respuesta, fail } from '../respuesta/respuesta';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';
    let errorTecnico: string | undefined;
    let tipoError: string | undefined;
    let errores: string[] | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as any;
        message = responseObj.message || message;
        errorTecnico = responseObj.errorTecnico;
        tipoError = responseObj.tipoError;
        
        // Manejar arrays de mensajes (validación)
        if (Array.isArray(responseObj.message)) {
          errores = responseObj.message;
          message = 'Error de validación';
        }
      }

      // Determinar tipo de error basado en el tipo de excepción
      if (!tipoError) {
        if (exception instanceof NotFoundException) {
          tipoError = 'NOT_FOUND';
        } else if (exception instanceof BadRequestException) {
          tipoError = 'BAD_REQUEST';
        } else {
          tipoError = 'HTTP_EXCEPTION';
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errorTecnico = exception.stack;
      tipoError = 'INTERNAL_ERROR';
    }

    // Log del error
    const logMessage = `${request.method} ${request.url} - ${status} - ${message}`;
    
    if (status >= 500) {
      this.logger.error(
        logMessage,
        exception instanceof Error ? exception.stack : String(exception),
        'AllExceptionsFilter',
      );
    } else {
      this.logger.warn(logMessage, 'AllExceptionsFilter');
    }

    // Respuesta estandarizada
    const respuesta: Respuesta<null> = fail<null>(message, {
      errorTecnico: process.env.NODE_ENV === 'development' ? errorTecnico : undefined,
      tipoError: tipoError || 'INTERNAL_ERROR',
      errores,
    });

    response.status(status).json(respuesta);
  }
}

