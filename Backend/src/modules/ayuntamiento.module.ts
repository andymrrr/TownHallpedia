import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';
import { DesbloqueosAyuntamiento } from '../entities/desbloqueos-ayuntamiento.entity';
import { Heroe } from '../entities/heroe.entity';
import { Tropa } from '../entities/tropa.entity';
import { Hechizo } from '../entities/hechizo.entity';
import { AyuntamientoService } from '../services/ayuntamiento.service';
import { DesbloqueosAyuntamientoService } from '../services/desbloqueos-ayuntamiento.service';
import { AyuntamientoController } from '../controllers/ayuntamiento.controller';
import { DesbloqueosAyuntamientoController } from '../controllers/desbloqueos-ayuntamiento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ayuntamiento, DesbloqueosAyuntamiento, Heroe, Tropa, Hechizo])],
  controllers: [AyuntamientoController, DesbloqueosAyuntamientoController],
  providers: [AyuntamientoService, DesbloqueosAyuntamientoService],
  exports: [AyuntamientoService, DesbloqueosAyuntamientoService],
})
export class AyuntamientoModule {}
