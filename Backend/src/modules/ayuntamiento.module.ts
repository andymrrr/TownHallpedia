import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ayuntamiento } from '../infrastructure/persistence/entities/ayuntamiento.entity';
import { Heroe } from '../infrastructure/persistence/entities/heroe.entity';
import { Tropa } from '../infrastructure/persistence/entities/tropa.entity';
import { Hechizo } from '../infrastructure/persistence/entities/hechizo.entity';
import { Edificio } from '../infrastructure/persistence/entities/edificio.entity';
import { Animal } from '../infrastructure/persistence/entities/animal.entity';
import { Recurso } from '../infrastructure/persistence/entities/recurso.entity';
// Nuevas entidades de desbloqueos separadas por tipo
import { DesbloqueosAyuntamientoHeroe } from '../infrastructure/persistence/entities/desbloqueos-ayuntamiento-heroe.entity';
import { DesbloqueosAyuntamientoTropa } from '../infrastructure/persistence/entities/desbloqueos-ayuntamiento-tropa.entity';
import { DesbloqueosAyuntamientoHechizo } from '../infrastructure/persistence/entities/desbloqueos-ayuntamiento-hechizo.entity';
import { DesbloqueosAyuntamientoEdificio } from '../infrastructure/persistence/entities/desbloqueos-ayuntamiento-edificio.entity';
import { DesbloqueosAyuntamientoAnimal } from '../infrastructure/persistence/entities/desbloqueos-ayuntamiento-animal.entity';
// Nuevas entidades de nivel detalle separadas por tipo
import { NivelDetalleHeroe } from '../infrastructure/persistence/entities/nivel-detalle-heroe.entity';
import { NivelDetalleTropa } from '../infrastructure/persistence/entities/nivel-detalle-tropa.entity';
import { NivelDetalleHechizo } from '../infrastructure/persistence/entities/nivel-detalle-hechizo.entity';
import { NivelDetalleEdificio } from '../infrastructure/persistence/entities/nivel-detalle-edificio.entity';
import { NivelDetalleAnimal } from '../infrastructure/persistence/entities/nivel-detalle-animal.entity';
import { AyuntamientoService } from '../application/services/ayuntamiento.service';
import { AyuntamientoController } from '../presentation/controllers/ayuntamiento.controller';
import { AyuntamientoRepository } from '../infrastructure/persistence/repositories/ayuntamiento.repository';
import { ObtenerAyuntamientoConDesbloqueosUseCase } from '../application/use-cases/ayuntamiento/obtener-ayuntamiento-con-desbloqueos.use-case';
import { ObtenerAyuntamientoPorNivelConDesbloqueosUseCase } from '../application/use-cases/ayuntamiento/obtener-ayuntamiento-por-nivel-con-desbloqueos.use-case';

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
  providers: [
    AyuntamientoService,
    AyuntamientoRepository,
    ObtenerAyuntamientoConDesbloqueosUseCase,
    ObtenerAyuntamientoPorNivelConDesbloqueosUseCase,
  ],
  exports: [AyuntamientoService],
})
export class AyuntamientoModule {}
