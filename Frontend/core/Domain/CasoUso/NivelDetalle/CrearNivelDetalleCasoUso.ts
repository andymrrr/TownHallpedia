import { INivelDetalleService } from '../../../api/Interfaz/INivelDetalleService';
import { NivelDetalle } from '../../Model/NivelDetalle/NivelDetalle';
import { CreateNivelDetalle } from '../../Model/NivelDetalle/CreateNivelDetalle';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para crear un nuevo nivel de detalle
 */
export class CrearNivelDetalleCasoUso {
  private readonly _nivelDetalleService: INivelDetalleService;

  constructor(nivelDetalleService: INivelDetalleService) {
    this._nivelDetalleService = nivelDetalleService;
  }

  async ejecutar(createDto: CreateNivelDetalle): Promise<Respuesta<NivelDetalle>> {
    try {
      const resultado = await this._nivelDetalleService.create(createDto);

      if (!resultado.completado) {
        throw new Error(`Error al crear nivel de detalle: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en CrearNivelDetalleCasoUso:', error);
      const errorResponse: Respuesta<NivelDetalle> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al crear nivel de detalle',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'NIVEL_DETALLE'
      };

      return errorResponse;
    }
  }
}

