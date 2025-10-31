import { Api } from '../configuracion';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { Tropa, CreateTropa, UpdateTropa } from '@/core/Domain/Model/Tropa';
import { ITropaService } from '../Interfaz/ITropaService';
import { mapErrorARespuesta } from '@/utils/Api/ManejoErrores';

export class TropaService implements ITropaService {
  private baseUrl = '/tropas';

  async findAll(): Promise<Respuesta<Tropa[]>> {
    try {
      const response = await Api.get<Tropa[]>(this.baseUrl);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Tropa[]>(error, 'obtener tropas', 'TROPA');
    }
  }

  async findOne(id: number): Promise<Respuesta<Tropa>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await Api.get<Tropa>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Tropa>(error, 'obtener tropa', 'TROPA');
    }
  }

  async findByTipo(tipo: string): Promise<Respuesta<Tropa[]>> {
    try {
      const url = `${this.baseUrl}/tipo/${tipo}`;
      const response = await Api.get<Tropa[]>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Tropa[]>(error, 'obtener tropas por tipo', 'TROPA');
    }
  }

  async findByCuartel(cuartelId: number): Promise<Respuesta<Tropa[]>> {
    try {
      const url = `${this.baseUrl}/cuartel/${cuartelId}`;
      const response = await Api.get<Tropa[]>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Tropa[]>(error, 'obtener tropas por cuartel', 'TROPA');
    }
  }

  async findWithRelations(id: number): Promise<Respuesta<Tropa>> {
    try {
      const url = `${this.baseUrl}/${id}/relaciones`;
      const response = await Api.get<Tropa>(url);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Tropa>(error, 'obtener tropa con relaciones', 'TROPA');
    }
  }

  async create(createDto: CreateTropa): Promise<Respuesta<Tropa>> {
    try {
      const response = await Api.post<Tropa>(this.baseUrl, createDto);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Tropa>(error, 'crear tropa', 'TROPA');
    }
  }

  async update(id: number, updateDto: UpdateTropa): Promise<Respuesta<Tropa>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await Api.put<Tropa>(url, updateDto);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Tropa>(error, 'actualizar tropa', 'TROPA');
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
      return mapErrorARespuesta<void>(error, 'eliminar tropa', 'TROPA');
    }
  }
}

