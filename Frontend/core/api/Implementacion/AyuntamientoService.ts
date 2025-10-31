import { Api } from '../configuracion';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { Ayuntamiento, CreateAyuntamiento, UpdateAyuntamiento } from '@/core/Domain/Model/Ayuntamiento';
import { IAyuntamientoService } from '../Interfaz/IAyuntamientoService';
import { mapErrorARespuesta } from '@/utils/Api/ManejoErrores';

export class AyuntamientoService implements IAyuntamientoService {
  private baseUrl = '/ayuntamientos';

  async findAll(): Promise<Respuesta<Ayuntamiento[]>> {
    try {
      const response = await Api.get<Ayuntamiento[]>(this.baseUrl);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Ayuntamiento[]>(error, 'obtener ayuntamientos', 'AYUNTAMIENTO');
    }
  }

  async findOne(id: number): Promise<Respuesta<Ayuntamiento>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await Api.get<Ayuntamiento>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Ayuntamiento>(error, 'obtener ayuntamiento', 'AYUNTAMIENTO');
    }
  }

  async findByNivel(nivel: number): Promise<Respuesta<Ayuntamiento>> {
    try {
      const url = `${this.baseUrl}/nivel/${nivel}`;
      const response = await Api.get<Ayuntamiento>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Ayuntamiento>(error, 'obtener ayuntamiento por nivel', 'AYUNTAMIENTO');
    }
  }

  async findWithDesbloqueos(id: number): Promise<Respuesta<Ayuntamiento>> {
    try {
      const url = `${this.baseUrl}/${id}/desbloqueos`;
      const response = await Api.get<Ayuntamiento>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Ayuntamiento>(error, 'obtener ayuntamiento con desbloqueos', 'AYUNTAMIENTO');
    }
  }

  async create(createDto: CreateAyuntamiento): Promise<Respuesta<Ayuntamiento>> {
    try {
      const response = await Api.post<Ayuntamiento>(this.baseUrl, createDto);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Ayuntamiento>(error, 'crear ayuntamiento', 'AYUNTAMIENTO');
    }
  }

  async update(id: number, updateDto: UpdateAyuntamiento): Promise<Respuesta<Ayuntamiento>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await Api.put<Ayuntamiento>(url, updateDto);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Ayuntamiento>(error, 'actualizar ayuntamiento', 'AYUNTAMIENTO');
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
      return mapErrorARespuesta<void>(error, 'eliminar ayuntamiento', 'AYUNTAMIENTO');
    }
  }
}

