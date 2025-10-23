import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';
import { AyuntamientoService } from '../services/ayuntamiento.service';
import { AyuntamientoController } from '../controllers/ayuntamiento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ayuntamiento])],
  controllers: [AyuntamientoController],
  providers: [AyuntamientoService],
  exports: [AyuntamientoService],
})
export class AyuntamientoModule {}
