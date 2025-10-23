import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesbloqueosAyuntamiento } from '../entities/desbloqueos-ayuntamiento.entity';
import { DesbloqueosAyuntamientoService } from '../services/desbloqueos-ayuntamiento.service';
import { DesbloqueosAyuntamientoController } from '../controllers/desbloqueos-ayuntamiento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DesbloqueosAyuntamiento])],
  controllers: [DesbloqueosAyuntamientoController],
  providers: [DesbloqueosAyuntamientoService],
  exports: [DesbloqueosAyuntamientoService],
})
export class DesbloqueosAyuntamientoModule {}
