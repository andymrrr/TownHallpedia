import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Recurso } from '../../entities/recurso.entity';

/**
 * Helper para manejar el cache de recursos
 */
@Injectable()
export class RecursoCacheHelper {
  private cache: Map<string, Recurso> = new Map();

  /**
   * Carga todos los recursos en cache
   */
  async cargarCache(manager: EntityManager): Promise<void> {
    const recursos = await manager.find(Recurso);
    this.cache.clear();
    for (const recurso of recursos) {
      this.cache.set(recurso.nombre, recurso);
    }
  }

  /**
   * Limpia el cache
   */
  limpiar(): void {
    this.cache.clear();
  }

  /**
   * Obtiene un recurso por nombre desde el cache
   */
  obtener(nombre: string): Recurso | null {
    return this.cache.get(nombre) || null;
  }

  /**
   * Obtiene el ID de un recurso por nombre
   */
  obtenerId(nombre: string): number | null {
    const recurso = this.obtener(nombre);
    return recurso?.id || null;
  }
}

