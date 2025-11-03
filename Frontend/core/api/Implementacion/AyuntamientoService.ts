import { Api } from '../configuracion';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { PageDto, PaginationQueryDto } from '@/core/Domain/Model/Comun/Pagination';
import { PaginationVm } from '@/core/Domain/Model/Comun/PaginationVm';
import { Ayuntamiento, CreateAyuntamiento, UpdateAyuntamiento } from '@/core/Domain/Model/Ayuntamiento';
import { IAyuntamientoService } from '../Interfaz/IAyuntamientoService';
import { mapErrorARespuesta, mapErrorAPaginationVm } from '@/utils/Api/ManejoErrores';

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

  async findByNivelWithDesbloqueos(nivel: number): Promise<Respuesta<Ayuntamiento>> {
    try {
      const url = `${this.baseUrl}/nivel/${nivel}/desbloqueos`;
      console.log('📡 Llamando a:', url);
      const response = await Api.get<Respuesta<Ayuntamiento> | Ayuntamiento>(url);
      console.log('📥 Respuesta recibida:', response.data);
      
      // Si la respuesta ya tiene la estructura Respuesta, retornarla directamente
      if (response.data && typeof response.data === 'object' && 'completado' in response.data) {
        console.log('✅ Respuesta tiene estructura Respuesta');
        return response.data as Respuesta<Ayuntamiento>;
      }
      
      // Si solo viene el dato, envolverlo en Respuesta
      console.log('📦 Envolviendo datos en Respuesta');
      return {
        completado: true,
        datos: response.data as Ayuntamiento
      };
    } catch (error: any) {
      console.error('❌ Error en findByNivelWithDesbloqueos:', error);
      return mapErrorARespuesta<Ayuntamiento>(error, 'obtener ayuntamiento por nivel con desbloqueos', 'AYUNTAMIENTO');
    }
  }

  async findWithDesbloqueos(id: number): Promise<Respuesta<Ayuntamiento>> {
    try {
      const url = `${this.baseUrl}/${id}/desbloqueos`;
      const response = await Api.get<Ayuntamiento>(url);
      console.log(response.data);
      return {
        completado: true,
        datos: response.data
      };
    } catch (error: any) {
      return mapErrorARespuesta<Ayuntamiento>(error, 'obtener ayuntamiento con desbloqueos', 'AYUNTAMIENTO');
    }
  }

  async paginate(query: PaginationQueryDto): Promise<PaginationVm<Ayuntamiento>> {
    try {
      const url = `${this.baseUrl}/paginacion`;
      const response = await Api.get<PaginationVm<Ayuntamiento>>(url, { params: query });
      return response.data;
    } catch (error: any) {
      return mapErrorAPaginationVm<Ayuntamiento>(error, 'obtener ayuntamientos paginados', query.page, query.limit, 'AYUNTAMIENTO');
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

