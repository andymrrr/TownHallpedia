import { Api } from '../configuracion';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { Edificio, CreateEdificio, UpdateEdificio } from '@/core/Domain/Model/Edificio';
import { IEdificioService } from '../Interfaz/IEdificioService';
import { mapErrorARespuesta } from '@/utils/Api/ManejoErrores';

export class EdificioService implements IEdificioService {
  private baseUrl = '/edificios';

  async findAll(): Promise<Respuesta<Edificio[]>> {
    try {
      const response = await Api.get<Edificio[]>(this.baseUrl);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Edificio[]>(error, 'obtener edificios', 'EDIFICIO');
    }
  }

  async findOne(id: number): Promise<Respuesta<Edificio>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await Api.get<Edificio>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Edificio>(error, 'obtener edificio', 'EDIFICIO');
    }
  }

  async findByTipo(tipo: string): Promise<Respuesta<Edificio[]>> {
    try {
      const url = `${this.baseUrl}/tipo/${tipo}`;
      const response = await Api.get<Edificio[]>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Edificio[]>(error, 'obtener edificios por tipo', 'EDIFICIO');
    }
  }

  async findWithTropas(id: number): Promise<Respuesta<Edificio>> {
    try {
      const url = `${this.baseUrl}/${id}/tropas`;
      const response = await Api.get<Edificio>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Edificio>(error, 'obtener edificio con tropas', 'EDIFICIO');
    }
  }

  async create(createDto: CreateEdificio): Promise<Respuesta<Edificio>> {
    try {
      const response = await Api.post<Edificio>(this.baseUrl, createDto);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Edificio>(error, 'crear edificio', 'EDIFICIO');
    }
  }

  async update(id: number, updateDto: UpdateEdificio): Promise<Respuesta<Edificio>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await Api.put<Edificio>(url, updateDto);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Edificio>(error, 'actualizar edificio', 'EDIFICIO');
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
      return mapErrorARespuesta<void>(error, 'eliminar edificio', 'EDIFICIO');
    }
  }
}

