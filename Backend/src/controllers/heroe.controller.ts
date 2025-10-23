import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { HeroeService } from '../services/heroe.service';
import {
  CreateHeroeDto,
  UpdateHeroeDto,
  HeroeResponseDto,
} from '../dto/heroe.dto';
import { plainToClass } from 'class-transformer';

@Controller('heroes')
export class HeroeController {
  constructor(private readonly heroeService: HeroeService) {}

  @Get()
  async findAll(): Promise<HeroeResponseDto[]> {
    const heroes = await this.heroeService.findAll();
    return heroes.map(heroe => 
      plainToClass(HeroeResponseDto, heroe, { excludeExtraneousValues: true })
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<HeroeResponseDto> {
    const heroe = await this.heroeService.findOne(id);
    if (!heroe) {
      throw new Error('Héroe no encontrado');
    }
    return plainToClass(HeroeResponseDto, heroe, { excludeExtraneousValues: true });
  }

  @Get('tipo-recurso/:tipoRecurso')
  async findByTipoRecurso(@Param('tipoRecurso') tipoRecurso: string): Promise<HeroeResponseDto[]> {
    const heroes = await this.heroeService.findByTipoRecurso(tipoRecurso);
    return heroes.map(heroe => 
      plainToClass(HeroeResponseDto, heroe, { excludeExtraneousValues: true })
    );
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<HeroeResponseDto> {
    const heroe = await this.heroeService.findWithRelations(id);
    if (!heroe) {
      throw new Error('Héroe no encontrado');
    }
    return plainToClass(HeroeResponseDto, heroe, { excludeExtraneousValues: true });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateHeroeDto): Promise<HeroeResponseDto> {
    const heroe = await this.heroeService.createHeroe(createDto);
    return plainToClass(HeroeResponseDto, heroe, { excludeExtraneousValues: true });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateHeroeDto,
  ): Promise<HeroeResponseDto> {
    const heroe = await this.heroeService.updateHeroe(id, updateDto);
    if (!heroe) {
      throw new Error('Héroe no encontrado');
    }
    return plainToClass(HeroeResponseDto, heroe, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.heroeService.delete(id);
    if (!deleted) {
      throw new Error('Héroe no encontrado');
    }
  }
}
