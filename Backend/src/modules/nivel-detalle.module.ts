import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelDetalle } from '../entities/nivel-detalle.entity';
import { NivelDetalleService } from '../services/nivel-detalle.service';
import { NivelDetalleController } from '../controllers/nivel-detalle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NivelDetalle])],
  controllers: [NivelDetalleController],
  providers: [NivelDetalleService],
  exports: [NivelDetalleService],
})
export class NivelDetalleModule {}
