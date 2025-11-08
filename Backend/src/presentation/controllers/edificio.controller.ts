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
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { EdificioService } from '../../application/services/edificio.service';
import {
  CreateEdificioDto,
  UpdateEdificioDto,
  EdificioResponseDto,
} from '../dto/edificio.dto';
import { plainToClass } from 'class-transformer';
import { Respuesta, ok } from '../../common/respuesta/respuesta';
import { PaginationPipe } from '../pipes/pagination.pipe';
import { PageDto, PaginationQueryDto } from '../../common/pagination/pagination.dto';
import { Edificio } from '../../infrastructure/persistence/entities/edificio.entity';
import { EdificioConDesbloqueos } from '../../domain/types/desbloqueos.types';

@ApiTags('Edificios')
@Controller('edificios')
export class EdificioController {
  constructor(private readonly edificioService: EdificioService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los edificios' })
  @ApiOkResponse({
    description: 'Lista de edificios obtenida exitosamente',
    type: [EdificioResponseDto],
  })
  async findAll(): Promise<Respuesta<Edificio[]>> {
    const edificios = await this.edificioService.findAll();
    return ok<Edificio[]>(edificios);
  }

  @Get('paginacion')
  @ApiOperation({ summary: 'Paginación de edificios' })
  @ApiOkResponse({
    description: 'Página de edificios obtenida exitosamente',
  })
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): Promise<Respuesta<PageDto<Edificio>>> {
    const page = await this.edificioService.paginate(query);
    return ok<PageDto<Edificio>>(page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener edificio por ID' })
  @ApiParam({ name: 'id', description: 'ID del edificio', type: 'integer' })
  @ApiOkResponse({
    description: 'Edificio encontrado exitosamente',
    type: EdificioResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Edificio no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<Edificio>> {
    const edificio = await this.edificioService.findOne(id);
    if (!edificio) {
      throw new NotFoundException('Edificio no encontrado');
    }
    return ok<Edificio>(edificio);
  }

  @Get('tipo/:tipo')
  @ApiOperation({ summary: 'Obtener edificios por tipo' })
  @ApiParam({ name: 'tipo', description: 'Tipo de edificio', type: 'string' })
  @ApiOkResponse({
    description: 'Lista de edificios del tipo especificado',
    type: [EdificioResponseDto],
  })
  async findByTipo(@Param('tipo') tipo: string): Promise<Respuesta<Edificio[]>> {
    const edificios = await this.edificioService.findByTipo(tipo);
    return ok<Edificio[]>(edificios);
  }

  @Get(':id/tropas')
  @ApiOperation({ summary: 'Obtener edificio con tropas' })
  @ApiParam({ name: 'id', description: 'ID del edificio', type: 'integer' })
  @ApiOkResponse({
    description: 'Edificio con tropas obtenido exitosamente',
    type: EdificioResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Edificio no encontrado' })
  async findWithTropas(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<Edificio>> {
    const edificio = await this.edificioService.findWithTropas(id);
    if (!edificio) {
      throw new NotFoundException('Edificio no encontrado');
    }
    return ok<Edificio>(edificio);
  }

  @Get(':id/desbloqueos')
  @ApiOperation({ summary: 'Obtener edificio con desbloqueos' })
  @ApiParam({ name: 'id', description: 'ID del edificio', type: 'integer' })
  @ApiOkResponse({
    description: 'Edificio con desbloqueos obtenido exitosamente',
    type: EdificioResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Edificio no encontrado' })
  async findWithDesbloqueos(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<EdificioConDesbloqueos>> {
    const edificio = await this.edificioService.findWithDesbloqueos(id);
    if (!edificio) {
      throw new NotFoundException('Edificio no encontrado');
    }
    return ok<EdificioConDesbloqueos>(edificio);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear nuevo edificio' })
  @ApiBody({ type: CreateEdificioDto })
  @ApiCreatedResponse({
    description: 'Edificio creado exitosamente',
    type: EdificioResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  async create(@Body() createDto: CreateEdificioDto): Promise<Respuesta<Edificio>> {
    const edificio = await this.edificioService.createEdificio(createDto);
    return ok<Edificio>(edificio, 'Creado exitosamente');
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar edificio existente' })
  @ApiParam({ name: 'id', description: 'ID del edificio', type: 'integer' })
  @ApiBody({ type: UpdateEdificioDto })
  @ApiOkResponse({
    description: 'Edificio actualizado exitosamente',
    type: EdificioResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Edificio no encontrado' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEdificioDto,
  ): Promise<Respuesta<Edificio>> {
    const edificio = await this.edificioService.updateEdificio(id, updateDto);
    if (!edificio) {
      throw new NotFoundException('Edificio no encontrado');
    }
    return ok<Edificio>(edificio, 'Actualizado exitosamente');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar edificio' })
  @ApiParam({ name: 'id', description: 'ID del edificio', type: 'integer' })
  @ApiOkResponse({ description: 'Edificio eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Edificio no encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    const deleted = await this.edificioService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Edificio no encontrado');
    }
    return ok<void>(undefined, 'Eliminado exitosamente');
  }
}
