import { IHeroeService } from '../../../api/Interfaz/IHeroeService';
import { Heroe } from '../../Model/Heroe/Heroe';
import { CreateHeroe } from '../../Model/Heroe/CreateHeroe';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para crear un nuevo héroe
 */
export class CrearHeroeCasoUso {
  private readonly _heroeService: IHeroeService;

  constructor(heroeService: IHeroeService) {
    this._heroeService = heroeService;
  }

  async ejecutar(createDto: CreateHeroe): Promise<Respuesta<Heroe>> {
    try {
      const resultado = await this._heroeService.create(createDto);

      if (!resultado.completado) {
        throw new Error(`Error al crear héroe: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en CrearHeroeCasoUso:', error);
      const errorResponse: Respuesta<Heroe> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al crear héroe',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HEROE'
      };

      return errorResponse;
    }
  }
}

