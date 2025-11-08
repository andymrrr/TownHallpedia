import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heroe } from '../entities/heroe.entity';
import { Habilidad } from '../entities/habilidad.entity';
import { DesbloqueosAyuntamientoHeroe } from '../entities/desbloqueos-ayuntamiento-heroe.entity';
import { HeroeService } from '../services/heroe.service';
import { HeroeController } from '../controllers/heroe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Heroe, Habilidad, DesbloqueosAyuntamientoHeroe])],
  controllers: [HeroeController],
  providers: [HeroeService],
  exports: [HeroeService],
})
export class HeroeModule {}
