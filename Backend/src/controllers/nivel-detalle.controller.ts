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

@Controller('nivel-detalle')
export class NivelDetalleController {
  constructor(private readonly nivelDetalleService: NivelDetalleService) {}

  @Get()
  async findAll(): Promise<NivelDetalleResponseDto[]> {
    const nivelesDetalle = await this.nivelDetalleService.findAll();
    return nivelesDetalle.map(nivelDetalle => 
      plainToClass(NivelDetalleResponseDto, nivelDetalle, { excludeExtraneousValues: true })
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<NivelDetalleResponseDto> {
    const nivelDetalle = await this.nivelDetalleService.findOne(id);
    if (!nivelDetalle) {
      throw new Error('Nivel detalle no encontrado');
    }
    return plainToClass(NivelDetalleResponseDto, nivelDetalle, { excludeExtraneousValues: true });
  }

  @Get('entidad/:tipoEntidad/:entidadId')
  async findByEntidad(
    @Param('tipoEntidad') tipoEntidad: TipoEntidad,
    @Param('entidadId', ParseIntPipe) entidadId: number,
  ): Promise<NivelDetalleResponseDto[]> {
    const nivelesDetalle = await this.nivelDetalleService.findByEntidad(tipoEntidad, entidadId);
    return nivelesDetalle.map(nivelDetalle => 
      plainToClass(NivelDetalleResponseDto, nivelDetalle, { excludeExtraneousValues: true })
    );
  }

  @Get('entidad/:tipoEntidad/:entidadId/:nivel')
  async findByNivel(
    @Param('tipoEntidad') tipoEntidad: TipoEntidad,
    @Param('entidadId', ParseIntPipe) entidadId: number,
    @Param('nivel', ParseIntPipe) nivel: number,
  ): Promise<NivelDetalleResponseDto> {
    const nivelDetalle = await this.nivelDetalleService.findByNivel(tipoEntidad, entidadId, nivel);
    if (!nivelDetalle) {
      throw new Error('Nivel detalle no encontrado');
    }
    return plainToClass(NivelDetalleResponseDto, nivelDetalle, { excludeExtraneousValues: true });
  }

  @Get('ayuntamiento/:ayuntamientoId')
  async findByAyuntamiento(@Param('ayuntamientoId', ParseIntPipe) ayuntamientoId: number): Promise<NivelDetalleResponseDto[]> {
    const nivelesDetalle = await this.nivelDetalleService.findByAyuntamiento(ayuntamientoId);
    return nivelesDetalle.map(nivelDetalle => 
      plainToClass(NivelDetalleResponseDto, nivelDetalle, { excludeExtraneousValues: true })
    );
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<NivelDetalleResponseDto> {
    const nivelDetalle = await this.nivelDetalleService.findWithRelations(id);
    if (!nivelDetalle) {
      throw new Error('Nivel detalle no encontrado');
    }
    return plainToClass(NivelDetalleResponseDto, nivelDetalle, { excludeExtraneousValues: true });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateNivelDetalleDto): Promise<NivelDetalleResponseDto> {
    const nivelDetalle = await this.nivelDetalleService.createNivelDetalle(createDto);
    return plainToClass(NivelDetalleResponseDto, nivelDetalle, { excludeExtraneousValues: true });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateNivelDetalleDto,
  ): Promise<NivelDetalleResponseDto> {
    const nivelDetalle = await this.nivelDetalleService.updateNivelDetalle(id, updateDto);
    if (!nivelDetalle) {
      throw new Error('Nivel detalle no encontrado');
    }
    return plainToClass(NivelDetalleResponseDto, nivelDetalle, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.nivelDetalleService.delete(id);
    if (!deleted) {
      throw new Error('Nivel detalle no encontrado');
    }
  }
}
