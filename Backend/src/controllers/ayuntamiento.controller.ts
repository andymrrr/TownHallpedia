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
  HttpException,
  HttpCode,
  Query,
  UsePipes,
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
import { PaginationPipe } from '../common/pagination/pagination.pipe';
import { PaginationQueryDto } from '../common/pagination/pagination.dto';
import { Respuesta, ok, fail } from '../common/respuesta/respuesta';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';

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
  async findAll(): Promise<Respuesta<any[]>> {
    try {
      const ayuntamientos = await this.ayuntamientoService.findAll();
      return ok<any[]>(ayuntamientos);
    } catch (error: any) {
      return fail<any[]>('Error al obtener ayuntamientos', { errorTecnico: error?.message, tipoError: 'AYUNTAMIENTO' });
    }
  }

  @Get('paginacion')
  @ApiOperation({ summary: 'Paginación de ayuntamientos' })
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): ReturnType<AyuntamientoService['paginate']> {
    try {
      console.log('query', query);
      const resultado = await this.ayuntamientoService.paginate(query);
      return resultado;
    } catch (error: unknown) {
      const mensajeTecnico = error instanceof Error ? error.message : String(error);
      throw new HttpException(
        {
          Mensaje: 'Error al paginar ayuntamientos',
          TipoError: 'AYUNTAMIENTO',
          ErrorTecnico: mensajeTecnico,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener ayuntamiento por ID' })
  @ApiParam({ name: 'id', description: 'ID del ayuntamiento', type: 'integer' })
  @ApiOkResponse({
    description: 'Ayuntamiento encontrado exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const ayuntamiento = await this.ayuntamientoService.findOne(id);
      if (!ayuntamiento) {
        return fail<any>('Ayuntamiento no encontrado', { tipoError: 'AYUNTAMIENTO' });
      }
      return ok<any>(ayuntamiento);
    } catch (error: any) {
      return fail<any>('Error al obtener ayuntamiento', { errorTecnico: error?.message, tipoError: 'AYUNTAMIENTO' });
    }
  }

  @Get('nivel/:nivel')
  @ApiOperation({ summary: 'Obtener ayuntamiento por nivel' })
  @ApiParam({ name: 'nivel', description: 'Nivel del ayuntamiento (1-15)', type: 'integer' })
  @ApiOkResponse({
    description: 'Ayuntamiento encontrado exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async findByNivel(@Param('nivel', ParseIntPipe) nivel: number): Promise<Respuesta<any>> {
    try {
      const ayuntamiento = await this.ayuntamientoService.findByNivel(nivel);
      if (!ayuntamiento) {
        return fail<any>('Ayuntamiento no encontrado', { tipoError: 'AYUNTAMIENTO' });
      }
      return ok<any>(ayuntamiento);
    } catch (error: any) {
      return fail<any>('Error al obtener ayuntamiento por nivel', { errorTecnico: error?.message, tipoError: 'AYUNTAMIENTO' });
    }
  }

  @Get('nivel/:nivel/desbloqueos')
  @ApiOperation({ summary: 'Obtener ayuntamiento por nivel con sus desbloqueos' })
  @ApiParam({ name: 'nivel', description: 'Nivel del ayuntamiento (1-15)', type: 'integer' })
  @ApiOkResponse({
    description: 'Ayuntamiento con desbloqueos obtenido exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async findByNivelWithDesbloqueos(@Param('nivel', ParseIntPipe) nivel: number): Promise<Respuesta<any>> {
    try {
      const ayuntamiento = await this.ayuntamientoService.findByNivelWithDesbloqueos(nivel);
      if (!ayuntamiento) {
        return fail<any>('Ayuntamiento no encontrado', { tipoError: 'AYUNTAMIENTO' });
      }
      return ok<any>(ayuntamiento);
    } catch (error: any) {
      return fail<any>('Error al obtener ayuntamiento por nivel con desbloqueos', { errorTecnico: error?.message, tipoError: 'AYUNTAMIENTO' });
    }
  }

  @Get(':id/desbloqueos')
  @ApiOperation({ summary: 'Obtener ayuntamiento con sus desbloqueos' })
  @ApiParam({ name: 'id', description: 'ID del ayuntamiento', type: 'integer' })
  @ApiOkResponse({
    description: 'Ayuntamiento con desbloqueos obtenido exitosamente',
    type: AyuntamientoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async findWithDesbloqueos(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    try {
      const ayuntamiento = await this.ayuntamientoService.findWithDesbloqueos(id);
      if (!ayuntamiento) {
        return fail<any>('Ayuntamiento no encontrado', { tipoError: 'AYUNTAMIENTO' });
      }
      return ok<any>(ayuntamiento);
    } catch (error: any) {
      return fail<any>('Error al obtener ayuntamiento con desbloqueos', { errorTecnico: error?.message, tipoError: 'AYUNTAMIENTO' });
    }
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
  async create(@Body() createDto: CreateAyuntamientoDto): Promise<Respuesta<any>> {
    try {
      const ayuntamiento = await this.ayuntamientoService.createAyuntamiento(createDto);
      return ok<any>(ayuntamiento, 'Creado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al crear ayuntamiento', { errorTecnico: error?.message, tipoError: 'AYUNTAMIENTO' });
    }
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
  ): Promise<Respuesta<any>> {
    try {
      const ayuntamiento = await this.ayuntamientoService.updateAyuntamiento(id, updateDto);
      if (!ayuntamiento) {
        return fail<any>('Ayuntamiento no encontrado', { tipoError: 'AYUNTAMIENTO' });
      }
      return ok<any>(ayuntamiento, 'Actualizado exitosamente');
    } catch (error: any) {
      return fail<any>('Error al actualizar ayuntamiento', { errorTecnico: error?.message, tipoError: 'AYUNTAMIENTO' });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar ayuntamiento' })
  @ApiParam({ name: 'id', description: 'ID del ayuntamiento', type: 'integer' })
  @ApiResponse({ status: 204, description: 'Ayuntamiento eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Ayuntamiento no encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    try {
      const deleted = await this.ayuntamientoService.delete(id);
      if (!deleted) {
        return fail<void>('Ayuntamiento no encontrado', { tipoError: 'AYUNTAMIENTO' });
      }
      return ok<void>(undefined, 'Eliminado exitosamente');
    } catch (error: any) {
      return fail<void>('Error al eliminar ayuntamiento', { errorTecnico: error?.message, tipoError: 'AYUNTAMIENTO' });
    }
  }
}
