import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edificio } from '../entities/edificio.entity';
import { EdificioService } from '../services/edificio.service';
import { EdificioController } from '../controllers/edificio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Edificio])],
  controllers: [EdificioController],
  providers: [EdificioService],
  exports: [EdificioService],
})
export class EdificioModule {}
