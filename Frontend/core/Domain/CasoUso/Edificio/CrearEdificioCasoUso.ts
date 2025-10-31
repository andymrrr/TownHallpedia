import { IEdificioService } from '../../../api/Interfaz/IEdificioService';
import { Edificio } from '../../Model/Edificio/Edificio';
import { CreateEdificio } from '../../Model/Edificio/CreateEdificio';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para crear un nuevo edificio
 */
export class CrearEdificioCasoUso {
  private readonly _edificioService: IEdificioService;

  constructor(edificioService: IEdificioService) {
    this._edificioService = edificioService;
  }

  async ejecutar(createDto: CreateEdificio): Promise<Respuesta<Edificio>> {
    try {
      const resultado = await this._edificioService.create(createDto);

      if (!resultado.completado) {
        throw new Error(`Error al crear edificio: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en CrearEdificioCasoUso:', error);
      const errorResponse: Respuesta<Edificio> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al crear edificio',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'EDIFICIO'
      };

      return errorResponse;
    }
  }
}

