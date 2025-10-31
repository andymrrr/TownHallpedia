import { INivelDetalleService } from '../../../api/Interfaz/INivelDetalleService';
import { NivelDetalle } from '../../Model/NivelDetalle/NivelDetalle';
import { UpdateNivelDetalle } from '../../Model/NivelDetalle/UpdateNivelDetalle';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para actualizar un nivel de detalle existente
 */
export class ActualizarNivelDetalleCasoUso {
  private readonly _nivelDetalleService: INivelDetalleService;

  constructor(nivelDetalleService: INivelDetalleService) {
    this._nivelDetalleService = nivelDetalleService;
  }

  async ejecutar(id: number, updateDto: UpdateNivelDetalle): Promise<Respuesta<NivelDetalle>> {
    try {
      const resultado = await this._nivelDetalleService.update(id, updateDto);

      if (!resultado.completado) {
        throw new Error(`Error al actualizar nivel de detalle: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ActualizarNivelDetalleCasoUso:', error);
      const errorResponse: Respuesta<NivelDetalle> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al actualizar nivel de detalle',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'NIVEL_DETALLE'
      };

      return errorResponse;
    }
  }
}

