import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heroe } from '../entities/heroe.entity';
import { HeroeService } from '../services/heroe.service';
import { HeroeController } from '../controllers/heroe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Heroe])],
  controllers: [HeroeController],
  providers: [HeroeService],
  exports: [HeroeService],
})
export class HeroeModule {}
