import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tropa } from '../infrastructure/persistence/entities/tropa.entity';
import { TropaService } from '../application/services/tropa.service';
import { TropaController } from '../presentation/controllers/tropa.controller';
import { TropaRepository } from '../infrastructure/persistence/repositories/tropa.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tropa])],
  controllers: [TropaController],
  providers: [TropaService, TropaRepository],
  exports: [TropaService],
})
export class TropaModule {}
