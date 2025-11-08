import { Api } from '../configuracion';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { Heroe, CreateHeroe, UpdateHeroe } from '@/core/Domain/Model/Heroe';
import { IHeroeService } from '../Interfaz/IHeroeService';
import { mapErrorARespuesta } from '@/utils/Api/ManejoErrores';

export class HeroeService implements IHeroeService {
  private baseUrl = '/heroes';

  async findAll(): Promise<Respuesta<Heroe[]>> {
    try {
      const response = await Api.get<Heroe[]>(this.baseUrl);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Heroe[]>(error, 'obtener héroes', 'HEROE');
    }
  }

  async findOne(id: number): Promise<Respuesta<Heroe>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await Api.get<Heroe>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Heroe>(error, 'obtener héroe', 'HEROE');
    }
  }

  async findByTipoRecurso(tipoRecurso: string): Promise<Respuesta<Heroe[]>> {
    try {
      const url = `${this.baseUrl}/tipo-recurso/${tipoRecurso}`;
      const response = await Api.get<Heroe[]>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Heroe[]>(error, 'obtener héroes por tipo de recurso', 'HEROE');
    }
  }

  async findWithRelations(id: number): Promise<Respuesta<Heroe>> {
    try {
      const url = `${this.baseUrl}/${id}/relaciones`;
      const response = await Api.get<Heroe>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Heroe>(error, 'obtener héroe con relaciones', 'HEROE');
    }
  }

  async findWithDesbloqueos(id: number): Promise<Respuesta<Heroe>> {
    try {
      const url = `${this.baseUrl}/${id}/desbloqueos`;
      const response = await Api.get<Heroe>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Heroe>(error, 'obtener héroe con desbloqueos', 'HEROE');
    }
  }

  async create(createDto: CreateHeroe): Promise<Respuesta<Heroe>> {
    try {
      const response = await Api.post<Heroe>(this.baseUrl, createDto);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Heroe>(error, 'crear héroe', 'HEROE');
    }
  }

  async update(id: number, updateDto: UpdateHeroe): Promise<Respuesta<Heroe>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await Api.put<Heroe>(url, updateDto);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Heroe>(error, 'actualizar héroe', 'HEROE');
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
      return mapErrorARespuesta<void>(error, 'eliminar héroe', 'HEROE');
    }
  }
}

