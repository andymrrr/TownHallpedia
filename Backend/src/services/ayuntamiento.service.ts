import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PaginationQueryDto, PaginationVm } from '../common/pagination/pagination.dto';
import { paginateVmQueryBuilder } from '../common/pagination/paginate-typeorm';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';
import { DesbloqueosAyuntamientoHeroe } from '../entities/desbloqueos-ayuntamiento-heroe.entity';
import { DesbloqueosAyuntamientoTropa } from '../entities/desbloqueos-ayuntamiento-tropa.entity';
import { DesbloqueosAyuntamientoHechizo } from '../entities/desbloqueos-ayuntamiento-hechizo.entity';
import { DesbloqueosAyuntamientoEdificio } from '../entities/desbloqueos-ayuntamiento-edificio.entity';
import { DesbloqueosAyuntamientoAnimal } from '../entities/desbloqueos-ayuntamiento-animal.entity';
import { BaseService } from './base.service';
import { CreateAyuntamientoDto, UpdateAyuntamientoDto } from '../dto/ayuntamiento.dto';

@Injectable()
export class AyuntamientoService extends BaseService<Ayuntamiento> {
  constructor(
    @InjectRepository(Ayuntamiento)
    private readonly ayuntamientoRepository: Repository<Ayuntamiento>,
    @InjectRepository(DesbloqueosAyuntamientoHeroe)
    private readonly desbloqueosHeroeRepository: Repository<DesbloqueosAyuntamientoHeroe>,
    @InjectRepository(DesbloqueosAyuntamientoTropa)
    private readonly desbloqueosTropaRepository: Repository<DesbloqueosAyuntamientoTropa>,
    @InjectRepository(DesbloqueosAyuntamientoHechizo)
    private readonly desbloqueosHechizoRepository: Repository<DesbloqueosAyuntamientoHechizo>,
    @InjectRepository(DesbloqueosAyuntamientoEdificio)
    private readonly desbloqueosEdificioRepository: Repository<DesbloqueosAyuntamientoEdificio>,
    @InjectRepository(DesbloqueosAyuntamientoAnimal)
    private readonly desbloqueosAnimalRepository: Repository<DesbloqueosAyuntamientoAnimal>,
  ) {
    super(ayuntamientoRepository);
  }

  async findByNivel(nivel: number): Promise<Ayuntamiento | null> {
    return this.findOneBy({ nivel } as any);
  }

  async findByTipoRecurso(tipoRecursoId: number): Promise<Ayuntamiento[]> {
    return this.ayuntamientoRepository.find({
      where: { tipoRecursoId },
      relations: ['tipoRecurso'],
    });
  }

  async findWithDesbloqueos(id: number): Promise<Ayuntamiento | null> {
    const ayuntamiento = await this.ayuntamientoRepository.findOne({
      where: { id },
      relations: ['tipoRecurso'],
    });

    if (!ayuntamiento) {
      return null;
    }

    // Obtener todos los desbloqueos de todos los tipos
    const [desbloqueosHeroes, desbloqueosTropas, desbloqueosHechizos, desbloqueosEdificios, desbloqueosAnimales] = await Promise.all([
      this.desbloqueosHeroeRepository.find({ where: { ayuntamientoId: id }, relations: ['heroe'] }),
      this.desbloqueosTropaRepository.find({ where: { ayuntamientoId: id }, relations: ['tropa'] }),
      this.desbloqueosHechizoRepository.find({ where: { ayuntamientoId: id }, relations: ['hechizo'] }),
      this.desbloqueosEdificioRepository.find({ where: { ayuntamientoId: id }, relations: ['edificio'] }),
      this.desbloqueosAnimalRepository.find({ where: { ayuntamientoId: id }, relations: ['animal'] }),
    ]);

    return {
      ...ayuntamiento,
      desbloqueos: {
        heroes: desbloqueosHeroes,
        tropas: desbloqueosTropas,
        hechizos: desbloqueosHechizos,
        edificios: desbloqueosEdificios,
        animales: desbloqueosAnimales,
      },
    } as any;
  }

  async findByNivelWithDesbloqueos(nivel: number): Promise<Ayuntamiento | null> {
    const ayuntamiento = await this.ayuntamientoRepository.findOne({
      where: { nivel },
      relations: ['tipoRecurso'],
    });

    if (!ayuntamiento) {
      return null;
    }

    // Obtener todos los ayuntamientos hasta el nivel actual (para desbloqueos acumulativos)
    const ayuntamientosHastaNivel = await this.ayuntamientoRepository.find({
      where: {},
    });
    const nivelesHastaActual = ayuntamientosHastaNivel
      .filter(a => a.nivel <= nivel)
      .map(a => a.id);

    // Obtener todos los desbloqueos acumulativos hasta este nivel
    const [todosDesbloqueosHeroes, todosDesbloqueosTropas, todosDesbloqueosHechizos, todosDesbloqueosEdificios, todosDesbloqueosAnimales] = await Promise.all([
      this.desbloqueosHeroeRepository.find({ 
        where: { ayuntamientoId: In(nivelesHastaActual) },
        relations: ['heroe', 'ayuntamiento'],
      }),
      this.desbloqueosTropaRepository.find({ 
        where: { ayuntamientoId: In(nivelesHastaActual) },
        relations: ['tropa', 'ayuntamiento'],
      }),
      this.desbloqueosHechizoRepository.find({ 
        where: { ayuntamientoId: In(nivelesHastaActual) },
        relations: ['hechizo', 'ayuntamiento'],
      }),
      this.desbloqueosEdificioRepository.find({ 
        where: { ayuntamientoId: In(nivelesHastaActual) },
        relations: ['edificio', 'ayuntamiento'],
      }),
      this.desbloqueosAnimalRepository.find({ 
        where: { ayuntamientoId: In(nivelesHastaActual) },
        relations: ['animal', 'ayuntamiento'],
      }),
    ]);

    // Agrupar desbloqueos por entidad y calcular rangos acumulativos
    const procesarDesbloqueos = <T extends { heroeId?: number; tropaId?: number; hechizoId?: number; edificioId?: number; animalId?: number; nivelMinimoDisponible: number; nivelMaximoDisponible: number; esNuevo: boolean; ayuntamiento: { nivel: number } }>(
      desbloqueos: T[],
      tipo: 'heroe' | 'tropa' | 'hechizo' | 'edificio' | 'animal'
    ) => {
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
        };
      });
    };

    const heroes = procesarDesbloqueos(todosDesbloqueosHeroes, 'heroe');
    const tropas = procesarDesbloqueos(todosDesbloqueosTropas, 'tropa');
    const hechizos = procesarDesbloqueos(todosDesbloqueosHechizos, 'hechizo');
    const edificios = procesarDesbloqueos(todosDesbloqueosEdificios, 'edificio');
    const animales = procesarDesbloqueos(todosDesbloqueosAnimales, 'animal');

    return {
      ...ayuntamiento,
      desbloqueos: {
        heroes,
        tropas,
        hechizos,
        edificios,
        animales,
        // Mantener compatibilidad con formato anterior (array plano)
        todos: [...heroes, ...tropas, ...hechizos, ...edificios, ...animales],
      },
    } as any;
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
