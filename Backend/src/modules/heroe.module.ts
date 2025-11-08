import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heroe } from '../infrastructure/persistence/entities/heroe.entity';
import { Habilidad } from '../infrastructure/persistence/entities/habilidad.entity';
import { DesbloqueosAyuntamientoHeroe } from '../infrastructure/persistence/entities/desbloqueos-ayuntamiento-heroe.entity';
import { HeroeService } from '../application/services/heroe.service';
import { HeroeController } from '../presentation/controllers/heroe.controller';
import { HeroeRepository } from '../infrastructure/persistence/repositories/heroe.repository';
import { ObtenerHeroeConDesbloqueosUseCase } from '../application/use-cases/heroe/obtener-heroe-con-desbloqueos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Heroe, Habilidad, DesbloqueosAyuntamientoHeroe])],
  controllers: [HeroeController],
  providers: [
    HeroeService,
    HeroeRepository,
    ObtenerHeroeConDesbloqueosUseCase,
  ],
  exports: [HeroeService],
})
export class HeroeModule {}
