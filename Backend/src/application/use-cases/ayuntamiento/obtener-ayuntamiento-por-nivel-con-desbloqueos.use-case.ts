import { Injectable } from '@nestjs/common';
import { AyuntamientoRepository } from '../../../infrastructure/persistence/repositories/ayuntamiento.repository';
import { Ayuntamiento } from '../../../infrastructure/persistence/entities/ayuntamiento.entity';
import { AyuntamientoConDesbloqueos, DesbloqueosResult } from '../../../domain/types/desbloqueos.types';

/**
 * Caso de uso: Obtener un ayuntamiento por nivel con desbloqueos acumulativos
 * Encapsula la lógica de negocio para calcular desbloqueos acumulativos hasta un nivel específico
 */
@Injectable()
export class ObtenerAyuntamientoPorNivelConDesbloqueosUseCase {
  constructor(
    private readonly ayuntamientoRepository: AyuntamientoRepository,
  ) {}

  /**
   * Ejecuta el caso de uso
   * @param nivel Nivel del ayuntamiento
   * @returns Ayuntamiento con desbloqueos acumulativos o null si no existe
   */
  async execute(nivel: number): Promise<AyuntamientoConDesbloqueos | null> {
    // Obtener el ayuntamiento por nivel
    const ayuntamiento = await this.ayuntamientoRepository.findByNivel(nivel);

    if (!ayuntamiento) {
      return null;
    }

    // Obtener todos los ayuntamientos hasta el nivel actual (para desbloqueos acumulativos)
    const ayuntamientosHastaNivel = await this.ayuntamientoRepository.findAllAyuntamientos();
    const nivelesHastaActual = ayuntamientosHastaNivel
      .filter(a => a.nivel <= nivel)
      .map(a => a.id);

    // Obtener todos los desbloqueos acumulativos hasta este nivel
    const { heroes: todosDesbloqueosHeroes, tropas: todosDesbloqueosTropas, hechizos: todosDesbloqueosHechizos, edificios: todosDesbloqueosEdificios, animales: todosDesbloqueosAnimales } = 
      await this.ayuntamientoRepository.findDesbloqueosByNiveles(nivelesHastaActual);

    // Procesar desbloqueos: agrupar por entidad y calcular rangos acumulativos
    const heroes = this.procesarDesbloqueos(todosDesbloqueosHeroes, nivel);
    const tropas = this.procesarDesbloqueos(todosDesbloqueosTropas, nivel);
    const hechizos = this.procesarDesbloqueos(todosDesbloqueosHechizos, nivel);
    const edificios = this.procesarDesbloqueos(todosDesbloqueosEdificios, nivel);
    const animales = this.procesarDesbloqueos(todosDesbloqueosAnimales, nivel);

    const desbloqueos: DesbloqueosResult = {
      heroes,
      tropas,
      hechizos,
      edificios,
      animales,
    };

    return {
      ...ayuntamiento,
      desbloqueos,
    };
  }

  /**
   * Procesa los desbloqueos agrupándolos por entidad y calculando rangos acumulativos
   * @private
   */
  private procesarDesbloqueos<T extends { 
    heroeId?: number; 
    tropaId?: number; 
    hechizoId?: number; 
    edificioId?: number; 
    animalId?: number; 
    nivelMinimoDisponible: number; 
    nivelMaximoDisponible: number; 
    esNuevo: boolean; 
    ayuntamiento: { nivel: number } 
  }>(
    desbloqueos: T[],
    nivel: number
  ): T[] {
    const agrupados = new Map<number, T[]>();
    
    // Agrupar por entidad
    desbloqueos.forEach(d => {
      const entidadId = d.heroeId || d.tropaId || d.hechizoId || d.edificioId || d.animalId;
      if (entidadId) {
        if (!agrupados.has(entidadId)) {
          agrupados.set(entidadId, []);
        }
        agrupados.get(entidadId)!.push(d);
      }
    });

    // Para cada entidad, calcular el rango acumulativo y determinar si es nuevo
    return Array.from(agrupados.entries()).map(([entidadId, desbloqueosEntidad]) => {
      const desbloqueosHastaNivel = desbloqueosEntidad.filter(d => d.ayuntamiento.nivel <= nivel);
      const esNuevoEnEsteNivel = desbloqueosEntidad.some(d => d.ayuntamiento.nivel === nivel && d.esNuevo);
      
      // Calcular rango acumulativo
      const nivelesMinimos = desbloqueosHastaNivel.map(d => d.nivelMinimoDisponible);
      const nivelesMaximos = desbloqueosHastaNivel.map(d => d.nivelMaximoDisponible);
      const nivelMinimo = Math.min(...nivelesMinimos);
      const nivelMaximo = Math.max(...nivelesMaximos);

      // Obtener el desbloqueo más reciente para la entidad completa
      const desbloqueoMasReciente = desbloqueosHastaNivel.sort((a, b) => 
        b.ayuntamiento.nivel - a.ayuntamiento.nivel
      )[0];

      return {
        ...desbloqueoMasReciente,
        nivelMinimo,
        nivelMaximo,
        esNuevoDesbloqueo: esNuevoEnEsteNivel,
      } as T;
    });
  }
}

