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
import { Respuesta, ok, fail } from '../common/respuesta/respuesta';
import { UsePipes, Query } from '@nestjs/common';
import { PaginationPipe } from '../common/pagination/pagination.pipe';
import { PageDto, PaginationQueryDto } from '../common/pagination/pagination.dto';

@Controller('heroes')
export class HeroeController {
  constructor(private readonly heroeService: HeroeService) {}

  @Get()
  async findAll(): Promise<Respuesta<any[]>> {
    try {
      const heroes = await this.heroeService.findAll();
      return ok<any[]>(heroes);
    } catch (error: any) {
      return fail<any[]>('Error al obtener héroes', { errorTecnico: error?.message, tipoError: 'HEROE' });
    }
  }

  @Get('paginacion')
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): Promise<Respuesta<PageDto<any>>> {
    try {
      const page = await this.heroeService.paginate(query);
      return ok<PageDto<any>>(page);
    } catch (error: any) {
      return fail<PageDto<any>>('Error al paginar héroes', { errorTecnico: error?.message, tipoError: 'HEROE' });
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const heroe = await this.heroeService.findOne(id);
      if (!heroe) return fail<any>('Héroe no encontrado', { tipoError: 'HEROE' });
      return ok<any>(heroe);
    } catch (error: any) {
      return fail<any>('Error al obtener héroe', { errorTecnico: error?.message, tipoError: 'HEROE' });
    }
  }

  @Get('tipo-recurso/:tipoRecurso')
  async findByTipoRecurso(@Param('tipoRecurso') tipoRecurso: string): Promise<Respuesta<any[]>> {
    try {
      const heroes = await this.heroeService.findByTipoRecurso(tipoRecurso);
      return ok<any[]>(heroes);
    } catch (error: any) {
      return fail<any[]>('Error al obtener héroes por tipo de recurso', { errorTecnico: error?.message, tipoError: 'HEROE' });
    }
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const heroe = await this.heroeService.findWithRelations(id);
      if (!heroe) return fail<any>('Héroe no encontrado', { tipoError: 'HEROE' });
      return ok<any>(heroe);
    } catch (error: any) {
      return fail<any>('Error al obtener héroe con relaciones', { errorTecnico: error?.message, tipoError: 'HEROE' });
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateHeroeDto): Promise<Respuesta<any>> {
    try {
      const heroe = await this.heroeService.createHeroe(createDto);
      return ok<any>(heroe, 'Creado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al crear héroe', { errorTecnico: error?.message, tipoError: 'HEROE' });
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateHeroeDto,
  ): Promise<Respuesta<any>> {
    try {
      const heroe = await this.heroeService.updateHeroe(id, updateDto);
      if (!heroe) return fail<any>('Héroe no encontrado', { tipoError: 'HEROE' });
      return ok<any>(heroe, 'Actualizado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al actualizar héroe', { errorTecnico: error?.message, tipoError: 'HEROE' });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    try {
      const deleted = await this.heroeService.delete(id);
      if (!deleted) return fail<void>('Héroe no encontrado', { tipoError: 'HEROE' });
      return ok<void>(undefined, 'Eliminado exitosamente');
    } catch (error: any) {
      return fail<void>('Error al eliminar héroe', { errorTecnico: error?.message, tipoError: 'HEROE' });
    }
  }
}
