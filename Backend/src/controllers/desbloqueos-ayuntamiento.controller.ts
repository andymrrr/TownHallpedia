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
import { DesbloqueosAyuntamientoService } from '../services/desbloqueos-ayuntamiento.service';
import {
  CreateDesbloqueosAyuntamientoDto,
  UpdateDesbloqueosAyuntamientoDto,
  DesbloqueosAyuntamientoResponseDto,
} from '../dto/desbloqueos-ayuntamiento.dto';
import { TipoEntidad } from '../entities/nivel-detalle.entity';
import { plainToClass } from 'class-transformer';
import { Respuesta, ok, fail } from '../common/respuesta/respuesta';
import { UsePipes, Query } from '@nestjs/common';
import { PaginationPipe } from '../common/pagination/pagination.pipe';
import { PageDto, PaginationQueryDto } from '../common/pagination/pagination.dto';

@Controller('desbloqueos-ayuntamiento')
export class DesbloqueosAyuntamientoController {
  constructor(private readonly desbloqueosService: DesbloqueosAyuntamientoService) {}

  @Get()
  async findAll(): Promise<Respuesta<any[]>> {
    try {
      const desbloqueos = await this.desbloqueosService.findAll();
      return ok<any[]>(desbloqueos);
    } catch (error: any) {
      return fail<any[]>('Error al obtener desbloqueos', { errorTecnico: error?.message, tipoError: 'DESBLOQUEO' });
    }
  }

  @Get('paginacion')
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): Promise<Respuesta<PageDto<any>>> {
    try {
      const page = await this.desbloqueosService.paginate(query);
      return ok<PageDto<any>>(page);
    } catch (error: any) {
      return fail<PageDto<any>>('Error al paginar desbloqueos', { errorTecnico: error?.message, tipoError: 'DESBLOQUEO' });
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const desbloqueo = await this.desbloqueosService.findOne(id);
      if (!desbloqueo) return fail<any>('Desbloqueo no encontrado', { tipoError: 'DESBLOQUEO' });
      return ok<any>(desbloqueo);
    } catch (error: any) {
      return fail<any>('Error al obtener desbloqueo', { errorTecnico: error?.message, tipoError: 'DESBLOQUEO' });
    }
  }

  @Get('ayuntamiento/:ayuntamientoId')
  async findByAyuntamiento(@Param('ayuntamientoId', ParseIntPipe) ayuntamientoId: number): Promise<Respuesta<any[]>> {
    try {
      const desbloqueos = await this.desbloqueosService.findByAyuntamiento(ayuntamientoId);
      return ok<any[]>(desbloqueos);
    } catch (error: any) {
      return fail<any[]>('Error al obtener desbloqueos por ayuntamiento', { errorTecnico: error?.message, tipoError: 'DESBLOQUEO' });
    }
  }

  @Get('entidad/:tipoEntidad/:entidadId')
  async findByEntidad(
    @Param('tipoEntidad') tipoEntidad: TipoEntidad,
    @Param('entidadId', ParseIntPipe) entidadId: number,
  ): Promise<Respuesta<any[]>> {
    try {
      const desbloqueos = await this.desbloqueosService.findByEntidad(tipoEntidad, entidadId);
      return ok<any[]>(desbloqueos);
    } catch (error: any) {
      return fail<any[]>('Error al obtener desbloqueos por entidad', { errorTecnico: error?.message, tipoError: 'DESBLOQUEO' });
    }
  }

  @Get('ayuntamiento/:ayuntamientoId/entidad/:tipoEntidad/:entidadId')
  async findByAyuntamientoAndEntidad(
    @Param('ayuntamientoId', ParseIntPipe) ayuntamientoId: number,
    @Param('tipoEntidad') tipoEntidad: TipoEntidad,
    @Param('entidadId', ParseIntPipe) entidadId: number,
  ): Promise<Respuesta<any>> {
    try {
      const desbloqueo = await this.desbloqueosService.findByAyuntamientoAndEntidad(ayuntamientoId, tipoEntidad, entidadId);
      if (!desbloqueo) return fail<any>('Desbloqueo no encontrado', { tipoError: 'DESBLOQUEO' });
      return ok<any>(desbloqueo);
    } catch (error: any) {
      return fail<any>('Error al obtener desbloqueo por ayuntamiento/entidad', { errorTecnico: error?.message, tipoError: 'DESBLOQUEO' });
    }
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const desbloqueo = await this.desbloqueosService.findWithRelations(id);
      if (!desbloqueo) return fail<any>('Desbloqueo no encontrado', { tipoError: 'DESBLOQUEO' });
      return ok<any>(desbloqueo);
    } catch (error: any) {
      return fail<any>('Error al obtener desbloqueo con relaciones', { errorTecnico: error?.message, tipoError: 'DESBLOQUEO' });
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateDesbloqueosAyuntamientoDto): Promise<Respuesta<any>> {
    try {
      const desbloqueo = await this.desbloqueosService.createDesbloqueo(createDto);
      return ok<any>(desbloqueo, 'Creado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al crear desbloqueo', { errorTecnico: error?.message, tipoError: 'DESBLOQUEO' });
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDesbloqueosAyuntamientoDto,
  ): Promise<Respuesta<any>> {
    try {
      const desbloqueo = await this.desbloqueosService.updateDesbloqueo(id, updateDto);
      if (!desbloqueo) return fail<any>('Desbloqueo no encontrado', { tipoError: 'DESBLOQUEO' });
      return ok<any>(desbloqueo, 'Actualizado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al actualizar desbloqueo', { errorTecnico: error?.message, tipoError: 'DESBLOQUEO' });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    try {
      const deleted = await this.desbloqueosService.delete(id);
      if (!deleted) return fail<void>('Desbloqueo no encontrado', { tipoError: 'DESBLOQUEO' });
      return ok<void>(undefined, 'Eliminado exitosamente');
    } catch (error: any) {
      return fail<void>('Error al eliminar desbloqueo', { errorTecnico: error?.message, tipoError: 'DESBLOQUEO' });
    }
  }
}
