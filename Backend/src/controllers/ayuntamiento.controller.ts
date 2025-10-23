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
import { AyuntamientoService } from '../services/ayuntamiento.service';
import {
  CreateAyuntamientoDto,
  UpdateAyuntamientoDto,
  AyuntamientoResponseDto,
} from '../dto/ayuntamiento.dto';
import { plainToClass } from 'class-transformer';

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
  async findAll(): Promise<AyuntamientoResponseDto[]> {
    const ayuntamientos = await this.ayuntamientoService.findAll();
    return ayuntamientos.map(ayuntamiento => 
      plainToClass(AyuntamientoResponseDto, ayuntamiento, { excludeExtraneousValues: true })
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener ayuntamiento por ID' })
  @ApiParam({ name: 'id', description: 'ID del ayuntamiento', type: 'integer' })
  @ApiOkResponse({
    description: 'Ayuntamiento encontrado exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<AyuntamientoResponseDto> {
    const ayuntamiento = await this.ayuntamientoService.findOne(id);
    if (!ayuntamiento) {
      throw new Error('Ayuntamiento no encontrado');
    }
    return plainToClass(AyuntamientoResponseDto, ayuntamiento, { excludeExtraneousValues: true });
  }

  @Get('nivel/:nivel')
  @ApiOperation({ summary: 'Obtener ayuntamiento por nivel' })
  @ApiParam({ name: 'nivel', description: 'Nivel del ayuntamiento (1-15)', type: 'integer' })
  @ApiOkResponse({
    description: 'Ayuntamiento encontrado exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async findByNivel(@Param('nivel', ParseIntPipe) nivel: number): Promise<AyuntamientoResponseDto> {
    const ayuntamiento = await this.ayuntamientoService.findByNivel(nivel);
    if (!ayuntamiento) {
      throw new Error('Ayuntamiento no encontrado');
    }
    return plainToClass(AyuntamientoResponseDto, ayuntamiento, { excludeExtraneousValues: true });
  }

  @Get(':id/desbloqueos')
  @ApiOperation({ summary: 'Obtener ayuntamiento con sus desbloqueos' })
  @ApiParam({ name: 'id', description: 'ID del ayuntamiento', type: 'integer' })
  @ApiOkResponse({
    description: 'Ayuntamiento con desbloqueos obtenido exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async findWithDesbloqueos(@Param('id', ParseIntPipe) id: number): Promise<AyuntamientoResponseDto> {
    const ayuntamiento = await this.ayuntamientoService.findWithDesbloqueos(id);
    if (!ayuntamiento) {
      throw new Error('Ayuntamiento no encontrado');
    }
    return plainToClass(AyuntamientoResponseDto, ayuntamiento, { excludeExtraneousValues: true });
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
  async create(@Body() createDto: CreateAyuntamientoDto): Promise<AyuntamientoResponseDto> {
    const ayuntamiento = await this.ayuntamientoService.createAyuntamiento(createDto);
    return plainToClass(AyuntamientoResponseDto, ayuntamiento, { excludeExtraneousValues: true });
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
  ): Promise<AyuntamientoResponseDto> {
    const ayuntamiento = await this.ayuntamientoService.updateAyuntamiento(id, updateDto);
    if (!ayuntamiento) {
      throw new Error('Ayuntamiento no encontrado');
    }
    return plainToClass(AyuntamientoResponseDto, ayuntamiento, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar ayuntamiento' })
  @ApiParam({ name: 'id', description: 'ID del ayuntamiento', type: 'integer' })
  @ApiResponse({ status: 204, description: 'Ayuntamiento eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.ayuntamientoService.delete(id);
    if (!deleted) {
      throw new Error('Ayuntamiento no encontrado');
    }
  }
}
