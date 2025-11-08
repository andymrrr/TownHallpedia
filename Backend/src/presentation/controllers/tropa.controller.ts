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
  NotFoundException,
} from '@nestjs/common';
import { TropaService } from '../../application/services/tropa.service';
import {
  CreateTropaDto,
  UpdateTropaDto,
  TropaResponseDto,
} from '../dto/tropa.dto';
import { plainToClass } from 'class-transformer';
import { Respuesta, ok } from '../../common/respuesta/respuesta';
import { UsePipes, Query } from '@nestjs/common';
import { PaginationPipe } from '../pipes/pagination.pipe';
import { PageDto, PaginationQueryDto } from '../../common/pagination/pagination.dto';

@Controller('tropas')
export class TropaController {
  constructor(private readonly tropaService: TropaService) {}

  @Get()
  async findAll(): Promise<Respuesta<any[]>> {
    const tropas = await this.tropaService.findAll();
    return ok<any[]>(tropas);
  }

  @Get('paginacion')
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): Promise<Respuesta<PageDto<any>>> {
    const page = await this.tropaService.paginate(query);
    return ok<PageDto<any>>(page);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    const tropa = await this.tropaService.findOne(id);
    if (!tropa) {
      throw new NotFoundException('Tropa no encontrada');
    }
    return ok<any>(tropa);
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string): Promise<Respuesta<any[]>> {
    const tropas = await this.tropaService.findByTipo(tipo);
    return ok<any[]>(tropas);
  }

  @Get('cuartel/:cuartelId')
  async findByCuartel(@Param('cuartelId', ParseIntPipe) cuartelId: number): Promise<Respuesta<any[]>> {
    const tropas = await this.tropaService.findByCuartel(cuartelId);
    return ok<any[]>(tropas);
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    const tropa = await this.tropaService.findWithRelations(id);
    if (!tropa) {
      throw new NotFoundException('Tropa no encontrada');
    }
    return ok<any>(tropa);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateTropaDto): Promise<Respuesta<any>> {
    const tropa = await this.tropaService.createTropa(createDto);
    return ok<any>(tropa, 'Creado exitosamente');
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTropaDto,
  ): Promise<Respuesta<any>> {
    const tropa = await this.tropaService.updateTropa(id, updateDto);
    if (!tropa) {
      throw new NotFoundException('Tropa no encontrada');
    }
    return ok<any>(tropa, 'Actualizado exitosamente');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    const deleted = await this.tropaService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Tropa no encontrada');
    }
    return ok<void>(undefined, 'Eliminado exitosamente');
  }
}
