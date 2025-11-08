import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import {
  RecursoSeedService,
  AyuntamientoSeedService,
  EdificioSeedService,
  HeroeSeedService,
  HechizoSeedService,
  TropaSeedService,
  AnimalSeedService,
  DesbloqueoSeedService,
  NivelDetalleSeedService,
} from './services';
import { RecursoCacheHelper } from './helpers';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';
import { Edificio } from '../entities/edificio.entity';
import { Heroe } from '../entities/heroe.entity';
import { Hechizo } from '../entities/hechizo.entity';
import { Tropa } from '../entities/tropa.entity';
import { Animal } from '../entities/animal.entity';
import { Recurso } from '../entities/recurso.entity';
// Nuevas entidades de desbloqueos separadas por tipo
import { DesbloqueosAyuntamientoHeroe } from '../entities/desbloqueos-ayuntamiento-heroe.entity';
import { DesbloqueosAyuntamientoTropa } from '../entities/desbloqueos-ayuntamiento-tropa.entity';
import { DesbloqueosAyuntamientoHechizo } from '../entities/desbloqueos-ayuntamiento-hechizo.entity';
import { DesbloqueosAyuntamientoEdificio } from '../entities/desbloqueos-ayuntamiento-edificio.entity';
import { DesbloqueosAyuntamientoAnimal } from '../entities/desbloqueos-ayuntamiento-animal.entity';
// Nuevas entidades de nivel detalle separadas por tipo
import { NivelDetalleHeroe } from '../entities/nivel-detalle-heroe.entity';
import { NivelDetalleTropa } from '../entities/nivel-detalle-tropa.entity';
import { NivelDetalleHechizo } from '../entities/nivel-detalle-hechizo.entity';
import { NivelDetalleEdificio } from '../entities/nivel-detalle-edificio.entity';
import { NivelDetalleAnimal } from '../entities/nivel-detalle-animal.entity';

/**
 * Módulo de Seed
 *
 * Proporciona funcionalidad para poblar la base de datos con datos iniciales
 * de referencia del juego Clash of Clans.
 *
 * @module SeedModule
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recurso,
      Ayuntamiento,
      Edificio,
      Heroe,
      Hechizo,
      Tropa,
      Animal,
      // Entidades de desbloqueos
      DesbloqueosAyuntamientoHeroe,
      DesbloqueosAyuntamientoTropa,
      DesbloqueosAyuntamientoHechizo,
      DesbloqueosAyuntamientoEdificio,
      DesbloqueosAyuntamientoAnimal,
      // Entidades de nivel detalle
      NivelDetalleHeroe,
      NivelDetalleTropa,
      NivelDetalleHechizo,
      NivelDetalleEdificio,
      NivelDetalleAnimal,
    ]),
  ],
  controllers: [SeedController],
  providers: [
    RecursoCacheHelper,
    SeedService,
    RecursoSeedService,
    AyuntamientoSeedService,
    EdificioSeedService,
    HeroeSeedService,
    HechizoSeedService,
    TropaSeedService,
    AnimalSeedService,
    DesbloqueoSeedService,
    NivelDetalleSeedService,
  ],
  exports: [SeedService],
})
export class SeedModule {}

