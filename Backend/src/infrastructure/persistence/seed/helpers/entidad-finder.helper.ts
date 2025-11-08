import { EntityManager } from 'typeorm';
import { Edificio } from '../../entities/edificio.entity';
import { Tropa } from '../../entities/tropa.entity';
import { Hechizo } from '../../entities/hechizo.entity';
import { Heroe } from '../../entities/heroe.entity';
import { Animal } from '../../entities/animal.entity';

/**
 * Helper para encontrar entidades por tipo y nombres
 */
export class EntidadFinderHelper {
  /**
   * Obtiene entidades por tipo y nombres
   */
  static async encontrarPorTipo(
    manager: EntityManager,
    tipoEntidad: string,
    nombres: string[],
  ): Promise<Array<{ id: number }>> {
    switch (tipoEntidad) {
      case 'Edificio':
        return manager
          .createQueryBuilder(Edificio, 'e')
          .where('e.nombre IN (:...nombres)', { nombres })
          .getMany();

      case 'Tropa':
        return manager
          .createQueryBuilder(Tropa, 't')
          .where('t.nombre IN (:...nombres)', { nombres })
          .getMany();

      case 'Hechizo':
        return manager
          .createQueryBuilder(Hechizo, 'h')
          .where('h.nombre IN (:...nombres)', { nombres })
          .getMany();

      case 'Heroe':
        return manager
          .createQueryBuilder(Heroe, 'h')
          .where('h.nombre IN (:...nombres)', { nombres })
          .getMany();

      case 'Animal':
        return manager
          .createQueryBuilder(Animal, 'a')
          .where('a.nombre IN (:...nombres)', { nombres })
          .getMany();

      default:
        return [];
    }
  }
}

