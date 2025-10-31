import { IHechizoService } from '../../../api/Interfaz/IHechizoService';
import { Hechizo } from '../../Model/Hechizo/Hechizo';
import { UpdateHechizo } from '../../Model/Hechizo/UpdateHechizo';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para actualizar un hechizo existente
 */
export class ActualizarHechizoCasoUso {
  private readonly _hechizoService: IHechizoService;

  constructor(hechizoService: IHechizoService) {
    this._hechizoService = hechizoService;
  }

  async ejecutar(id: number, updateDto: UpdateHechizo): Promise<Respuesta<Hechizo>> {
    try {
      const resultado = await this._hechizoService.update(id, updateDto);

      if (!resultado.completado) {
        throw new Error(`Error al actualizar hechizo: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ActualizarHechizoCasoUso:', error);
      const errorResponse: Respuesta<Hechizo> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al actualizar hechizo',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HECHIZO'
      };

      return errorResponse;
    }
  }
}

