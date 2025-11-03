import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';
import { Edificio } from '../entities/edificio.entity';
import { Heroe } from '../entities/heroe.entity';
import { Hechizo } from '../entities/hechizo.entity';
import { Tropa } from '../entities/tropa.entity';
import { Animal } from '../entities/animal.entity';
import { Parametro } from '../entities/parametro.entity';
import { NivelDetalle } from '../entities/nivel-detalle.entity';
import { DesbloqueosAyuntamiento } from '../entities/desbloqueos-ayuntamiento.entity';

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
      Parametro,
      Ayuntamiento,
      Edificio,
      Heroe,
      Hechizo,
      Tropa,
      Animal,
      NivelDetalle,
      DesbloqueosAyuntamiento,
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}

