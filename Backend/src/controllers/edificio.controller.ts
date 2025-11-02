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
  Query,
} from '@nestjs/common';
import { EdificioService } from '../services/edificio.service';
import {
  CreateEdificioDto,
  UpdateEdificioDto,
  EdificioResponseDto,
} from '../dto/edificio.dto';
import { plainToClass } from 'class-transformer';
import { Respuesta, ok, fail } from '../common/respuesta/respuesta';
import { UsePipes, Query } from '@nestjs/common';
import { PaginationPipe } from '../common/pagination/pagination.pipe';
import { PageDto, PaginationQueryDto } from '../common/pagination/pagination.dto';

@Controller('edificios')
export class EdificioController {
  constructor(private readonly edificioService: EdificioService) {}

  @Get()
  async findAll(): Promise<Respuesta<any[]>> {
    try {
      const edificios = await this.edificioService.findAll();
      return ok<any[]>(edificios);
    } catch (error: any) {
      return fail<any[]>('Error al obtener edificios', { errorTecnico: error?.message, tipoError: 'EDIFICIO' });
    }
  }

  @Get('paginacion')
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): Promise<Respuesta<PageDto<any>>> {
    try {
      const page = await this.edificioService.paginate(query);
      return ok<PageDto<any>>(page);
    } catch (error: any) {
      return fail<PageDto<any>>('Error al paginar edificios', { errorTecnico: error?.message, tipoError: 'EDIFICIO' });
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const edificio = await this.edificioService.findOne(id);
      if (!edificio) return fail<any>('Edificio no encontrado', { tipoError: 'EDIFICIO' });
      return ok<any>(edificio);
    } catch (error: any) {
      return fail<any>('Error al obtener edificio', { errorTecnico: error?.message, tipoError: 'EDIFICIO' });
    }
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string): Promise<Respuesta<any[]>> {
    try {
      const edificios = await this.edificioService.findByTipo(tipo);
      return ok<any[]>(edificios);
    } catch (error: any) {
      return fail<any[]>('Error al obtener edificios por tipo', { errorTecnico: error?.message, tipoError: 'EDIFICIO' });
    }
  }

  @Get(':id/tropas')
  async findWithTropas(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const edificio = await this.edificioService.findWithTropas(id);
      if (!edificio) return fail<any>('Edificio no encontrado', { tipoError: 'EDIFICIO' });
      return ok<any>(edificio);
    } catch (error: any) {
      return fail<any>('Error al obtener edificio con tropas', { errorTecnico: error?.message, tipoError: 'EDIFICIO' });
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateEdificioDto): Promise<Respuesta<any>> {
    try {
      const edificio = await this.edificioService.createEdificio(createDto);
      return ok<any>(edificio, 'Creado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al crear edificio', { errorTecnico: error?.message, tipoError: 'EDIFICIO' });
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEdificioDto,
  ): Promise<Respuesta<any>> {
    try {
      const edificio = await this.edificioService.updateEdificio(id, updateDto);
      if (!edificio) return fail<any>('Edificio no encontrado', { tipoError: 'EDIFICIO' });
      return ok<any>(edificio, 'Actualizado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al actualizar edificio', { errorTecnico: error?.message, tipoError: 'EDIFICIO' });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    try {
      const deleted = await this.edificioService.delete(id);
      if (!deleted) return fail<void>('Edificio no encontrado', { tipoError: 'EDIFICIO' });
      return ok<void>(undefined, 'Eliminado exitosamente');
    } catch (error: any) {
      return fail<void>('Error al eliminar edificio', { errorTecnico: error?.message, tipoError: 'EDIFICIO' });
    }
  }
}
