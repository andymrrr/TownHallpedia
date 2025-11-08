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
import { AyuntamientoService } from '../../application/services/ayuntamiento.service';
import {
  CreateAyuntamientoDto,
  UpdateAyuntamientoDto,
  AyuntamientoResponseDto,
} from '../dto/ayuntamiento.dto';
import { PaginationPipe } from '../pipes/pagination.pipe';
import { PaginationQueryDto } from '../../common/pagination/pagination.dto';
import { Respuesta, ok } from '../../common/respuesta/respuesta';
import { Ayuntamiento } from '../../infrastructure/persistence/entities/ayuntamiento.entity';
import { AyuntamientoConDesbloqueos } from '../../domain/types/desbloqueos.types';

@ApiTags('Ayuntamientos')
@Controller('ayuntamientos')
export class AyuntamientoController {
  constructor(private readonly ayuntamientoService: AyuntamientoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los ayuntamientos' })
  @ApiOkResponse({
    description: 'Lista de ayuntamientos obtenida exitosamente',
    type: [AyuntamientoResponseDto],
  })
  async findAll(): Promise<Respuesta<Ayuntamiento[]>> {
    const ayuntamientos = await this.ayuntamientoService.findAll();
    return ok<Ayuntamiento[]>(ayuntamientos);
  }

  @Get('paginacion')
  @ApiOperation({ summary: 'Paginación de ayuntamientos' })
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): ReturnType<AyuntamientoService['paginate']> {
    return this.ayuntamientoService.paginate(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener ayuntamiento por ID' })
  @ApiParam({ name: 'id', description: 'ID del ayuntamiento', type: 'integer' })
  @ApiOkResponse({
    description: 'Ayuntamiento encontrado exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<Ayuntamiento>> {
    const ayuntamiento = await this.ayuntamientoService.findOne(id);
    if (!ayuntamiento) {
      throw new NotFoundException('Ayuntamiento no encontrado');
    }
    return ok<Ayuntamiento>(ayuntamiento);
  }

  @Get('nivel/:nivel')
  @ApiOperation({ summary: 'Obtener ayuntamiento por nivel' })
  @ApiParam({ name: 'nivel', description: 'Nivel del ayuntamiento (1-15)', type: 'integer' })
  @ApiOkResponse({
    description: 'Ayuntamiento encontrado exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async findByNivel(@Param('nivel', ParseIntPipe) nivel: number): Promise<Respuesta<Ayuntamiento>> {
    const ayuntamiento = await this.ayuntamientoService.findByNivel(nivel);
    if (!ayuntamiento) {
      throw new NotFoundException('Ayuntamiento no encontrado');
    }
    return ok<Ayuntamiento>(ayuntamiento);
  }

  @Get('nivel/:nivel/desbloqueos')
  @ApiOperation({ summary: 'Obtener ayuntamiento por nivel con sus desbloqueos' })
  @ApiParam({ name: 'nivel', description: 'Nivel del ayuntamiento (1-15)', type: 'integer' })
  @ApiOkResponse({
    description: 'Ayuntamiento con desbloqueos obtenido exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async findByNivelWithDesbloqueos(@Param('nivel', ParseIntPipe) nivel: number): Promise<Respuesta<AyuntamientoConDesbloqueos>> {
    const ayuntamiento = await this.ayuntamientoService.findByNivelWithDesbloqueos(nivel);
    if (!ayuntamiento) {
      throw new NotFoundException('Ayuntamiento no encontrado');
    }
    return ok<AyuntamientoConDesbloqueos>(ayuntamiento);
  }

  @Get(':id/desbloqueos')
  @ApiOperation({ summary: 'Obtener ayuntamiento con sus desbloqueos' })
  @ApiParam({ name: 'id', description: 'ID del ayuntamiento', type: 'integer' })
  @ApiOkResponse({
    description: 'Ayuntamiento con desbloqueos obtenido exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async findWithDesbloqueos(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<AyuntamientoConDesbloqueos>> {
    const ayuntamiento = await this.ayuntamientoService.findWithDesbloqueos(id);
    if (!ayuntamiento) {
      throw new NotFoundException('Ayuntamiento no encontrado');
    }
    return ok<AyuntamientoConDesbloqueos>(ayuntamiento);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear nuevo ayuntamiento' })
  @ApiBody({ type: CreateAyuntamientoDto })
  @ApiCreatedResponse({
    description: 'Ayuntamiento creado exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
  async create(@Body() createDto: CreateAyuntamientoDto): Promise<Respuesta<Ayuntamiento>> {
    const ayuntamiento = await this.ayuntamientoService.createAyuntamiento(createDto);
    return ok<Ayuntamiento>(ayuntamiento, 'Creado exitosamente');
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar ayuntamiento existente' })
  @ApiParam({ name: 'id', description: 'ID del ayuntamiento', type: 'integer' })
  @ApiBody({ type: UpdateAyuntamientoDto })
  @ApiOkResponse({
    description: 'Ayuntamiento actualizado exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAyuntamientoDto,
  ): Promise<Respuesta<Ayuntamiento>> {
    const ayuntamiento = await this.ayuntamientoService.updateAyuntamiento(id, updateDto);
    if (!ayuntamiento) {
      throw new NotFoundException('Ayuntamiento no encontrado');
    }
    return ok<Ayuntamiento>(ayuntamiento, 'Actualizado exitosamente');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar ayuntamiento' })
  @ApiParam({ name: 'id', description: 'ID del ayuntamiento', type: 'integer' })
  @ApiResponse({ status: 204, description: 'Ayuntamiento eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    const deleted = await this.ayuntamientoService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Ayuntamiento no encontrado');
    }
    return ok<void>(undefined, 'Eliminado exitosamente');
  }
}
