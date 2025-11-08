import { Api } from '../configuracion';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { Hechizo, CreateHechizo, UpdateHechizo } from '@/core/Domain/Model/Hechizo';
import { IHechizoService } from '../Interfaz/IHechizoService';
import { mapErrorARespuesta } from '@/utils/Api/ManejoErrores';

export class HechizoService implements IHechizoService {
  private baseUrl = '/hechizos';

  async findAll(): Promise<Respuesta<Hechizo[]>> {
    try {
      const response = await Api.get<Hechizo[]>(this.baseUrl);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Hechizo[]>(error, 'obtener hechizos', 'HECHIZO');
    }
  }

  async findOne(id: number): Promise<Respuesta<Hechizo>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await Api.get<Hechizo>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Hechizo>(error, 'obtener hechizo', 'HECHIZO');
    }
  }

  async findByTipo(tipo: string): Promise<Respuesta<Hechizo[]>> {
    try {
      const url = `${this.baseUrl}/tipo/${tipo}`;
      const response = await Api.get<Hechizo[]>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Hechizo[]>(error, 'obtener hechizos por tipo', 'HECHIZO');
    }
  }

  async findByEspacioHechizo(espacioHechizo: number): Promise<Respuesta<Hechizo[]>> {
    try {
      const url = `${this.baseUrl}/espacio-hechizo/${espacioHechizo}`;
      const response = await Api.get<Hechizo[]>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Hechizo[]>(error, 'obtener hechizos por espacio', 'HECHIZO');
    }
  }

  async findWithRelations(id: number): Promise<Respuesta<Hechizo>> {
    try {
      const url = `${this.baseUrl}/${id}/relaciones`;
      const response = await Api.get<Hechizo>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Hechizo>(error, 'obtener hechizo con relaciones', 'HECHIZO');
    }
  }

  async create(createDto: CreateHechizo): Promise<Respuesta<Hechizo>> {
    try {
      const response = await Api.post<Hechizo>(this.baseUrl, createDto);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Hechizo>(error, 'crear hechizo', 'HECHIZO');
    }
  }

  async update(id: number, updateDto: UpdateHechizo): Promise<Respuesta<Hechizo>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await Api.put<Hechizo>(url, updateDto);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Hechizo>(error, 'actualizar hechizo', 'HECHIZO');
    }
  }

  async delete(id: number): Promise<Respuesta<void>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      await Api.delete(url);
      return {
        completado: true,
        datos: undefined
      };
    } catch (error: any) {
      return mapErrorARespuesta<void>(error, 'eliminar hechizo', 'HECHIZO');
    }
  }
}

