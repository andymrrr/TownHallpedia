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
import { NivelDetalleService } from '../services/nivel-detalle.service';
import {
  CreateNivelDetalleDto,
  UpdateNivelDetalleDto,
  NivelDetalleResponseDto,
} from '../dto/nivel-detalle.dto';
import { TipoEntidad } from '../entities/nivel-detalle.entity';
import { plainToClass } from 'class-transformer';
import { Respuesta, ok, fail } from '../common/respuesta/respuesta';
import { UsePipes, Query } from '@nestjs/common';
import { PaginationPipe } from '../common/pagination/pagination.pipe';
import { PageDto, PaginationQueryDto } from '../common/pagination/pagination.dto';

@Controller('nivel-detalle')
export class NivelDetalleController {
  constructor(private readonly nivelDetalleService: NivelDetalleService) {}

  @Get()
  async findAll(): Promise<Respuesta<any[]>> {
    try {
      const nivelesDetalle = await this.nivelDetalleService.findAll();
      return ok<any[]>(nivelesDetalle);
    } catch (error: any) {
      return fail<any[]>('Error al obtener niveles detalle', { errorTecnico: error?.message, tipoError: 'NIVEL_DETALLE' });
    }
  }

  @Get('paginacion')
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): Promise<Respuesta<PageDto<any>>> {
    try {
      const page = await this.nivelDetalleService.paginate(query);
      return ok<PageDto<any>>(page);
    } catch (error: any) {
      return fail<PageDto<any>>('Error al paginar niveles detalle', { errorTecnico: error?.message, tipoError: 'NIVEL_DETALLE' });
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const nivelDetalle = await this.nivelDetalleService.findOne(id);
      if (!nivelDetalle) return fail<any>('Nivel detalle no encontrado', { tipoError: 'NIVEL_DETALLE' });
      return ok<any>(nivelDetalle);
    } catch (error: any) {
      return fail<any>('Error al obtener nivel detalle', { errorTecnico: error?.message, tipoError: 'NIVEL_DETALLE' });
    }
  }

  @Get('entidad/:tipoEntidad/:entidadId')
  async findByEntidad(
    @Param('tipoEntidad') tipoEntidad: TipoEntidad,
    @Param('entidadId', ParseIntPipe) entidadId: number,
  ): Promise<Respuesta<any[]>> {
    try {
      const nivelesDetalle = await this.nivelDetalleService.findByEntidad(tipoEntidad, entidadId);
      return ok<any[]>(nivelesDetalle);
    } catch (error: any) {
      return fail<any[]>('Error al obtener niveles detalle por entidad', { errorTecnico: error?.message, tipoError: 'NIVEL_DETALLE' });
    }
  }

  @Get('entidad/:tipoEntidad/:entidadId/:nivel')
  async findByNivel(
    @Param('tipoEntidad') tipoEntidad: TipoEntidad,
    @Param('entidadId', ParseIntPipe) entidadId: number,
    @Param('nivel', ParseIntPipe) nivel: number,
  ): Promise<Respuesta<any>> {
    try {
      const nivelDetalle = await this.nivelDetalleService.findByNivel(tipoEntidad, entidadId, nivel);
      if (!nivelDetalle) return fail<any>('Nivel detalle no encontrado', { tipoError: 'NIVEL_DETALLE' });
      return ok<any>(nivelDetalle);
    } catch (error: any) {
      return fail<any>('Error al obtener nivel detalle por nivel', { errorTecnico: error?.message, tipoError: 'NIVEL_DETALLE' });
    }
  }

  @Get('ayuntamiento/:ayuntamientoId')
  async findByAyuntamiento(@Param('ayuntamientoId', ParseIntPipe) ayuntamientoId: number): Promise<Respuesta<any[]>> {
    try {
      const nivelesDetalle = await this.nivelDetalleService.findByAyuntamiento(ayuntamientoId);
      return ok<any[]>(nivelesDetalle);
    } catch (error: any) {
      return fail<any[]>('Error al obtener niveles detalle por ayuntamiento', { errorTecnico: error?.message, tipoError: 'NIVEL_DETALLE' });
    }
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const nivelDetalle = await this.nivelDetalleService.findWithRelations(id);
      if (!nivelDetalle) return fail<any>('Nivel detalle no encontrado', { tipoError: 'NIVEL_DETALLE' });
      return ok<any>(nivelDetalle);
    } catch (error: any) {
      return fail<any>('Error al obtener nivel detalle con relaciones', { errorTecnico: error?.message, tipoError: 'NIVEL_DETALLE' });
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateNivelDetalleDto): Promise<Respuesta<any>> {
    try {
      const nivelDetalle = await this.nivelDetalleService.createNivelDetalle(createDto);
      return ok<any>(nivelDetalle, 'Creado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al crear nivel detalle', { errorTecnico: error?.message, tipoError: 'NIVEL_DETALLE' });
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateNivelDetalleDto,
  ): Promise<Respuesta<any>> {
    try {
      const nivelDetalle = await this.nivelDetalleService.updateNivelDetalle(id, updateDto);
      if (!nivelDetalle) return fail<any>('Nivel detalle no encontrado', { tipoError: 'NIVEL_DETALLE' });
      return ok<any>(nivelDetalle, 'Actualizado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al actualizar nivel detalle', { errorTecnico: error?.message, tipoError: 'NIVEL_DETALLE' });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    try {
      const deleted = await this.nivelDetalleService.delete(id);
      if (!deleted) return fail<void>('Nivel detalle no encontrado', { tipoError: 'NIVEL_DETALLE' });
      return ok<void>(undefined, 'Eliminado exitosamente');
    } catch (error: any) {
      return fail<void>('Error al eliminar nivel detalle', { errorTecnico: error?.message, tipoError: 'NIVEL_DETALLE' });
    }
  }
}
