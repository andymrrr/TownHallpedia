import { IHechizoService } from '../../../api/Interfaz/IHechizoService';
import { Hechizo } from '../../Model/Hechizo/Hechizo';
import { CreateHechizo } from '../../Model/Hechizo/CreateHechizo';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para crear un nuevo hechizo
 */
export class CrearHechizoCasoUso {
  private readonly _hechizoService: IHechizoService;

  constructor(hechizoService: IHechizoService) {
    this._hechizoService = hechizoService;
  }

  async ejecutar(createDto: CreateHechizo): Promise<Respuesta<Hechizo>> {
    try {
      const resultado = await this._hechizoService.create(createDto);

      if (!resultado.completado) {
        throw new Error(`Error al crear hechizo: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en CrearHechizoCasoUso:', error);
      const errorResponse: Respuesta<Hechizo> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al crear hechizo',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HECHIZO'
      };

      return errorResponse;
    }
  }
}

