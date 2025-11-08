import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';
import { Heroe } from '../entities/heroe.entity';
import { Tropa } from '../entities/tropa.entity';
import { Hechizo } from '../entities/hechizo.entity';
import { Edificio } from '../entities/edificio.entity';
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
import { AyuntamientoService } from '../services/ayuntamiento.service';
import { AyuntamientoController } from '../controllers/ayuntamiento.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ayuntamiento,
      Recurso,
      Heroe,
      Tropa,
      Hechizo,
      Edificio,
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
  controllers: [AyuntamientoController],
  providers: [AyuntamientoService],
  exports: [AyuntamientoService],
})
export class AyuntamientoModule {}
