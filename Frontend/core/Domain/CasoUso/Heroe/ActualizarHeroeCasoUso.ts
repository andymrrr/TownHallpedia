import { IHeroeService } from '../../../api/Interfaz/IHeroeService';
import { Heroe } from '../../Model/Heroe/Heroe';
import { UpdateHeroe } from '../../Model/Heroe/UpdateHeroe';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para actualizar un héroe existente
 */
export class ActualizarHeroeCasoUso {
  private readonly _heroeService: IHeroeService;

  constructor(heroeService: IHeroeService) {
    this._heroeService = heroeService;
  }

  async ejecutar(id: number, updateDto: UpdateHeroe): Promise<Respuesta<Heroe>> {
    try {
      const resultado = await this._heroeService.update(id, updateDto);

      if (!resultado.completado) {
        throw new Error(`Error al actualizar héroe: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ActualizarHeroeCasoUso:', error);
      const errorResponse: Respuesta<Heroe> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al actualizar héroe',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HEROE'
      };

      return errorResponse;
    }
  }
}

