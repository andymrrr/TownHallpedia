import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edificio } from '../infrastructure/persistence/entities/edificio.entity';
import { DesbloqueosAyuntamientoEdificio } from '../infrastructure/persistence/entities/desbloqueos-ayuntamiento-edificio.entity';
import { EdificioService } from '../application/services/edificio.service';
import { EdificioController } from '../presentation/controllers/edificio.controller';
import { EdificioRepository } from '../infrastructure/persistence/repositories/edificio.repository';
import { ObtenerEdificioConDesbloqueosUseCase } from '../application/use-cases/edificio/obtener-edificio-con-desbloqueos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Edificio, DesbloqueosAyuntamientoEdificio])],
  controllers: [EdificioController],
  providers: [
    EdificioService,
    EdificioRepository,
    ObtenerEdificioConDesbloqueosUseCase,
  ],
  exports: [EdificioService],
})
export class EdificioModule {}
