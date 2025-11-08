import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hechizo } from '../infrastructure/persistence/entities/hechizo.entity';
import { DesbloqueosAyuntamientoHechizo } from '../infrastructure/persistence/entities/desbloqueos-ayuntamiento-hechizo.entity';
import { HechizoService } from '../application/services/hechizo.service';
import { HechizoController } from '../presentation/controllers/hechizo.controller';
import { HechizoRepository } from '../infrastructure/persistence/repositories/hechizo.repository';
import { ObtenerHechizoConDesbloqueosUseCase } from '../application/use-cases/hechizo/obtener-hechizo-con-desbloqueos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Hechizo, DesbloqueosAyuntamientoHechizo])],
  controllers: [HechizoController],
  providers: [
    HechizoService,
    HechizoRepository,
    ObtenerHechizoConDesbloqueosUseCase,
  ],
  exports: [HechizoService],
})
export class HechizoModule {}
