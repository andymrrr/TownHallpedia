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
import { TropaService } from '../services/tropa.service';
import {
  CreateTropaDto,
  UpdateTropaDto,
  TropaResponseDto,
} from '../dto/tropa.dto';
import { plainToClass } from 'class-transformer';
import { Respuesta, ok, fail } from '../common/respuesta/respuesta';
import { UsePipes, Query } from '@nestjs/common';
import { PaginationPipe } from '../common/pagination/pagination.pipe';
import { PageDto, PaginationQueryDto } from '../common/pagination/pagination.dto';

@Controller('tropas')
export class TropaController {
  constructor(private readonly tropaService: TropaService) {}

  @Get()
  async findAll(): Promise<Respuesta<any[]>> {
    try {
      const tropas = await this.tropaService.findAll();
      return ok<any[]>(tropas);
    } catch (error: any) {
      return fail<any[]>('Error al obtener tropas', { errorTecnico: error?.message, tipoError: 'TROPA' });
    }
  }

  @Get('paginacion')
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): Promise<Respuesta<PageDto<any>>> {
    try {
      const page = await this.tropaService.paginate(query);
      return ok<PageDto<any>>(page);
    } catch (error: any) {
      return fail<PageDto<any>>('Error al paginar tropas', { errorTecnico: error?.message, tipoError: 'TROPA' });
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const tropa = await this.tropaService.findOne(id);
      if (!tropa) return fail<any>('Tropa no encontrada', { tipoError: 'TROPA' });
      return ok<any>(tropa);
    } catch (error: any) {
      return fail<any>('Error al obtener tropa', { errorTecnico: error?.message, tipoError: 'TROPA' });
    }
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string): Promise<Respuesta<any[]>> {
    try {
      const tropas = await this.tropaService.findByTipo(tipo);
      return ok<any[]>(tropas);
    } catch (error: any) {
      return fail<any[]>('Error al obtener tropas por tipo', { errorTecnico: error?.message, tipoError: 'TROPA' });
    }
  }

  @Get('cuartel/:cuartelId')
  async findByCuartel(@Param('cuartelId', ParseIntPipe) cuartelId: number): Promise<Respuesta<any[]>> {
    try {
      const tropas = await this.tropaService.findByCuartel(cuartelId);
      return ok<any[]>(tropas);
    } catch (error: any) {
      return fail<any[]>('Error al obtener tropas por cuartel', { errorTecnico: error?.message, tipoError: 'TROPA' });
    }
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const tropa = await this.tropaService.findWithRelations(id);
      if (!tropa) return fail<any>('Tropa no encontrada', { tipoError: 'TROPA' });
      return ok<any>(tropa);
    } catch (error: any) {
      return fail<any>('Error al obtener tropa con relaciones', { errorTecnico: error?.message, tipoError: 'TROPA' });
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateTropaDto): Promise<Respuesta<any>> {
    try {
      const tropa = await this.tropaService.createTropa(createDto);
      return ok<any>(tropa, 'Creado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al crear tropa', { errorTecnico: error?.message, tipoError: 'TROPA' });
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTropaDto,
  ): Promise<Respuesta<any>> {
    try {
      const tropa = await this.tropaService.updateTropa(id, updateDto);
      if (!tropa) return fail<any>('Tropa no encontrada', { tipoError: 'TROPA' });
      return ok<any>(tropa, 'Actualizado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al actualizar tropa', { errorTecnico: error?.message, tipoError: 'TROPA' });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    try {
      const deleted = await this.tropaService.delete(id);
      if (!deleted) return fail<void>('Tropa no encontrada', { tipoError: 'TROPA' });
      return ok<void>(undefined, 'Eliminado exitosamente');
    } catch (error: any) {
      return fail<void>('Error al eliminar tropa', { errorTecnico: error?.message, tipoError: 'TROPA' });
    }
  }
}
