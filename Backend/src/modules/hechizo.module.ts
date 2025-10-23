import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hechizo } from '../entities/hechizo.entity';
import { HechizoService } from '../services/hechizo.service';
import { HechizoController } from '../controllers/hechizo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hechizo])],
  controllers: [HechizoController],
  providers: [HechizoService],
  exports: [HechizoService],
})
export class HechizoModule {}
