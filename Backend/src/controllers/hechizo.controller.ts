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
import { HechizoService } from '../services/hechizo.service';
import {
  CreateHechizoDto,
  UpdateHechizoDto,
  HechizoResponseDto,
} from '../dto/hechizo.dto';
import { plainToClass } from 'class-transformer';
import { Respuesta, ok, fail } from '../common/respuesta/respuesta';
import { UsePipes, Query } from '@nestjs/common';
import { PaginationPipe } from '../common/pagination/pagination.pipe';
import { PageDto, PaginationQueryDto } from '../common/pagination/pagination.dto';

@Controller('hechizos')
export class HechizoController {
  constructor(private readonly hechizoService: HechizoService) {}

  @Get()
  async findAll(): Promise<Respuesta<any[]>> {
    try {
      const hechizos = await this.hechizoService.findAll();
      return ok<any[]>(hechizos);
    } catch (error: any) {
      return fail<any[]>('Error al obtener hechizos', { errorTecnico: error?.message, tipoError: 'HECHIZO' });
    }
  }

  @Get('paginacion')
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): Promise<Respuesta<PageDto<any>>> {
    try {
      const page = await this.hechizoService.paginate(query);
      return ok<PageDto<any>>(page);
    } catch (error: any) {
      return fail<PageDto<any>>('Error al paginar hechizos', { errorTecnico: error?.message, tipoError: 'HECHIZO' });
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const hechizo = await this.hechizoService.findOne(id);
      if (!hechizo) return fail<any>('Hechizo no encontrado', { tipoError: 'HECHIZO' });
      return ok<any>(hechizo);
    } catch (error: any) {
      return fail<any>('Error al obtener hechizo', { errorTecnico: error?.message, tipoError: 'HECHIZO' });
    }
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string): Promise<Respuesta<any[]>> {
    try {
      const hechizos = await this.hechizoService.findByTipo(tipo);
      return ok<any[]>(hechizos);
    } catch (error: any) {
      return fail<any[]>('Error al obtener hechizos por tipo', { errorTecnico: error?.message, tipoError: 'HECHIZO' });
    }
  }

  @Get('espacio/:espacioHechizo')
  async findByEspacioHechizo(@Param('espacioHechizo', ParseIntPipe) espacioHechizo: number): Promise<Respuesta<any[]>> {
    try {
      const hechizos = await this.hechizoService.findByEspacioHechizo(espacioHechizo);
      return ok<any[]>(hechizos);
    } catch (error: any) {
      return fail<any[]>('Error al obtener hechizos por espacio', { errorTecnico: error?.message, tipoError: 'HECHIZO' });
    }
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const hechizo = await this.hechizoService.findWithRelations(id);
      if (!hechizo) return fail<any>('Hechizo no encontrado', { tipoError: 'HECHIZO' });
      return ok<any>(hechizo);
    } catch (error: any) {
      return fail<any>('Error al obtener hechizo con relaciones', { errorTecnico: error?.message, tipoError: 'HECHIZO' });
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateHechizoDto): Promise<Respuesta<any>> {
    try {
      const hechizo = await this.hechizoService.createHechizo(createDto);
      return ok<any>(hechizo, 'Creado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al crear hechizo', { errorTecnico: error?.message, tipoError: 'HECHIZO' });
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateHechizoDto,
  ): Promise<Respuesta<any>> {
    try {
      const hechizo = await this.hechizoService.updateHechizo(id, updateDto);
      if (!hechizo) return fail<any>('Hechizo no encontrado', { tipoError: 'HECHIZO' });
      return ok<any>(hechizo, 'Actualizado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al actualizar hechizo', { errorTecnico: error?.message, tipoError: 'HECHIZO' });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    try {
      const deleted = await this.hechizoService.delete(id);
      if (!deleted) return fail<void>('Hechizo no encontrado', { tipoError: 'HECHIZO' });
      return ok<void>(undefined, 'Eliminado exitosamente');
    } catch (error: any) {
      return fail<void>('Error al eliminar hechizo', { errorTecnico: error?.message, tipoError: 'HECHIZO' });
    }
  }
}
