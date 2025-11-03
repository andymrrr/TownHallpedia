import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto, PaginationVm } from '../common/pagination/pagination.dto';
import { paginateVmQueryBuilder } from '../common/pagination/paginate-typeorm';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';
import { Heroe } from '../entities/heroe.entity';
import { Tropa } from '../entities/tropa.entity';
import { Hechizo } from '../entities/hechizo.entity';
import { TipoEntidad } from '../entities/nivel-detalle.entity';
import { BaseService } from './base.service';
import { CreateAyuntamientoDto, UpdateAyuntamientoDto } from '../dto/ayuntamiento.dto';

@Injectable()
export class AyuntamientoService extends BaseService<Ayuntamiento> {
  constructor(
    @InjectRepository(Ayuntamiento)
    private readonly ayuntamientoRepository: Repository<Ayuntamiento>,
    @InjectRepository(Heroe)
    private readonly heroeRepository: Repository<Heroe>,
    @InjectRepository(Tropa)
    private readonly tropaRepository: Repository<Tropa>,
    @InjectRepository(Hechizo)
    private readonly hechizoRepository: Repository<Hechizo>,
  ) {
    super(ayuntamientoRepository);
  }

  async findByNivel(nivel: number): Promise<Ayuntamiento | null> {
    return this.findOneBy({ nivel } as any);
  }

  async findByTipoRecurso(tipoRecurso: string): Promise<Ayuntamiento[]> {
    return this.ayuntamientoRepository.find({
      where: { tipoRecurso } as any,
    });
  }

  async findWithDesbloqueos(id: number): Promise<Ayuntamiento | null> {
    return this.ayuntamientoRepository.findOne({
      where: { id } as any,
      relations: ['desbloqueos', 'nivelesDetalle'],
    });
  }

  async findByNivelWithDesbloqueos(nivel: number): Promise<Ayuntamiento | null> {
    const ayuntamiento = await this.ayuntamientoRepository.findOne({
      where: { nivel } as any,
      relations: ['desbloqueos', 'desbloqueos.tipoEntidadParametro', 'nivelesDetalle', 'nivelesDetalle.tipoEntidadParametro'],
    });

    if (!ayuntamiento || !ayuntamiento.desbloqueos) {
      return ayuntamiento;
    }

    // Para cada desbloqueo, buscar el nivelDetalle correspondiente y el nombre de la entidad
    const desbloqueosConNivel = await Promise.all(
      ayuntamiento.desbloqueos.map(async (desbloqueo) => {
        const nivelDetalle = ayuntamiento.nivelesDetalle?.find(
          (nd) => nd.entidadId === desbloqueo.entidadId && 
                 nd.tipoEntidadParametroId === desbloqueo.tipoEntidadParametroId
        );
        
        const tipoEntidad = desbloqueo.tipoEntidadParametro?.valor?.toUpperCase() || '';
        let entidadNombre: string | undefined;

        // Obtener el nombre de la entidad según su tipo
        try {
          if (tipoEntidad.includes('HEROE') || tipoEntidad === 'HEROE') {
            const heroe = await this.heroeRepository.findOne({ where: { id: desbloqueo.entidadId } as any });
            entidadNombre = heroe?.nombre;
          } else if (tipoEntidad.includes('TROPA') || tipoEntidad === 'TROPA') {
            const tropa = await this.tropaRepository.findOne({ where: { id: desbloqueo.entidadId } as any });
            entidadNombre = tropa?.nombre;
          } else if (tipoEntidad.includes('HECHIZO') || tipoEntidad === 'HECHIZO') {
            const hechizo = await this.hechizoRepository.findOne({ where: { id: desbloqueo.entidadId } as any });
            entidadNombre = hechizo?.nombre;
          }
        } catch (error) {
          console.error(`Error al obtener nombre de entidad ${desbloqueo.entidadId}:`, error);
        }
        
        return {
          ...desbloqueo,
          nivel: nivelDetalle?.nivel || 1, // Default nivel 1 si no se encuentra
          entidadNombre: entidadNombre || undefined,
        };
      })
    );

    return {
      ...ayuntamiento,
      desbloqueos: desbloqueosConNivel,
    };
  }

  async paginate(query: PaginationQueryDto): Promise<PaginationVm<Ayuntamiento>> {
    const qb = this.ayuntamientoRepository.createQueryBuilder('a');

    if (query.search) {
      qb.andWhere('a.nombre LIKE :s', { s: `%${query.search}%` });
    }

    return paginateVmQueryBuilder(qb, query, [['a.id', 'DESC']]);
  }

  async createAyuntamiento(createDto: CreateAyuntamientoDto): Promise<Ayuntamiento> {
    // Verificar que el nivel no exista
    const existingAyuntamiento = await this.findByNivel(createDto.nivel);
    if (existingAyuntamiento) {
      throw new Error(`Ya existe un ayuntamiento con nivel ${createDto.nivel}`);
    }

    return this.create(createDto);
  }

  async updateAyuntamiento(id: number, updateDto: UpdateAyuntamientoDto): Promise<Ayuntamiento | null> {
    // Si se está cambiando el nivel, verificar que no exista otro con el mismo nivel
    if (updateDto.nivel) {
      const existingAyuntamiento = await this.findByNivel(updateDto.nivel);
      if (existingAyuntamiento && existingAyuntamiento.id !== id) {
        throw new Error(`Ya existe un ayuntamiento con nivel ${updateDto.nivel}`);
      }
    }

    return this.update(id, updateDto);
  }
}
