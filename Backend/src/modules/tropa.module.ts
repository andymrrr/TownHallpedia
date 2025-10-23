import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tropa } from '../entities/tropa.entity';
import { TropaService } from '../services/tropa.service';
import { TropaController } from '../controllers/tropa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tropa])],
  controllers: [TropaController],
  providers: [TropaService],
  exports: [TropaService],
})
export class TropaModule {}
