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
import { Tropa } from '../../infrastructure/persistence/entities/tropa.entity';

@Controller('tropas')
export class TropaController {
  constructor(private readonly tropaService: TropaService) {}

  @Get()
  async findAll(): Promise<Respuesta<Tropa[]>> {
    const tropas = await this.tropaService.findAll();
    return ok<Tropa[]>(tropas);
  }

  @Get('paginacion')
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): Promise<Respuesta<PageDto<Tropa>>> {
    const page = await this.tropaService.paginate(query);
    return ok<PageDto<Tropa>>(page);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<Tropa>> {
    const tropa = await this.tropaService.findOne(id);
    if (!tropa) {
      throw new NotFoundException('Tropa no encontrada');
    }
    return ok<Tropa>(tropa);
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string): Promise<Respuesta<Tropa[]>> {
    const tropas = await this.tropaService.findByTipo(tipo);
    return ok<Tropa[]>(tropas);
  }

  @Get('cuartel/:cuartelId')
  async findByCuartel(@Param('cuartelId', ParseIntPipe) cuartelId: number): Promise<Respuesta<Tropa[]>> {
    const tropas = await this.tropaService.findByCuartel(cuartelId);
    return ok<Tropa[]>(tropas);
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<Tropa>> {
    const tropa = await this.tropaService.findWithRelations(id);
    if (!tropa) {
      throw new NotFoundException('Tropa no encontrada');
    }
    return ok<Tropa>(tropa);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateTropaDto): Promise<Respuesta<Tropa>> {
    const tropa = await this.tropaService.createTropa(createDto);
    return ok<Tropa>(tropa, 'Creado exitosamente');
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTropaDto,
  ): Promise<Respuesta<Tropa>> {
    const tropa = await this.tropaService.updateTropa(id, updateDto);
    if (!tropa) {
      throw new NotFoundException('Tropa no encontrada');
    }
    return ok<Tropa>(tropa, 'Actualizado exitosamente');
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
