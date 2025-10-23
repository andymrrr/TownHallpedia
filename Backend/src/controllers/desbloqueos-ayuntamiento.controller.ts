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

@Controller('desbloqueos-ayuntamiento')
export class DesbloqueosAyuntamientoController {
  constructor(private readonly desbloqueosService: DesbloqueosAyuntamientoService) {}

  @Get()
  async findAll(): Promise<DesbloqueosAyuntamientoResponseDto[]> {
    const desbloqueos = await this.desbloqueosService.findAll();
    return desbloqueos.map(desbloqueo => 
      plainToClass(DesbloqueosAyuntamientoResponseDto, desbloqueo, { excludeExtraneousValues: true })
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DesbloqueosAyuntamientoResponseDto> {
    const desbloqueo = await this.desbloqueosService.findOne(id);
    if (!desbloqueo) {
      throw new Error('Desbloqueo no encontrado');
    }
    return plainToClass(DesbloqueosAyuntamientoResponseDto, desbloqueo, { excludeExtraneousValues: true });
  }

  @Get('ayuntamiento/:ayuntamientoId')
  async findByAyuntamiento(@Param('ayuntamientoId', ParseIntPipe) ayuntamientoId: number): Promise<DesbloqueosAyuntamientoResponseDto[]> {
    const desbloqueos = await this.desbloqueosService.findByAyuntamiento(ayuntamientoId);
    return desbloqueos.map(desbloqueo => 
      plainToClass(DesbloqueosAyuntamientoResponseDto, desbloqueo, { excludeExtraneousValues: true })
    );
  }

  @Get('entidad/:tipoEntidad/:entidadId')
  async findByEntidad(
    @Param('tipoEntidad') tipoEntidad: TipoEntidad,
    @Param('entidadId', ParseIntPipe) entidadId: number,
  ): Promise<DesbloqueosAyuntamientoResponseDto[]> {
    const desbloqueos = await this.desbloqueosService.findByEntidad(tipoEntidad, entidadId);
    return desbloqueos.map(desbloqueo => 
      plainToClass(DesbloqueosAyuntamientoResponseDto, desbloqueo, { excludeExtraneousValues: true })
    );
  }

  @Get('ayuntamiento/:ayuntamientoId/entidad/:tipoEntidad/:entidadId')
  async findByAyuntamientoAndEntidad(
    @Param('ayuntamientoId', ParseIntPipe) ayuntamientoId: number,
    @Param('tipoEntidad') tipoEntidad: TipoEntidad,
    @Param('entidadId', ParseIntPipe) entidadId: number,
  ): Promise<DesbloqueosAyuntamientoResponseDto> {
    const desbloqueo = await this.desbloqueosService.findByAyuntamientoAndEntidad(ayuntamientoId, tipoEntidad, entidadId);
    if (!desbloqueo) {
      throw new Error('Desbloqueo no encontrado');
    }
    return plainToClass(DesbloqueosAyuntamientoResponseDto, desbloqueo, { excludeExtraneousValues: true });
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<DesbloqueosAyuntamientoResponseDto> {
    const desbloqueo = await this.desbloqueosService.findWithRelations(id);
    if (!desbloqueo) {
      throw new Error('Desbloqueo no encontrado');
    }
    return plainToClass(DesbloqueosAyuntamientoResponseDto, desbloqueo, { excludeExtraneousValues: true });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateDesbloqueosAyuntamientoDto): Promise<DesbloqueosAyuntamientoResponseDto> {
    const desbloqueo = await this.desbloqueosService.createDesbloqueo(createDto);
    return plainToClass(DesbloqueosAyuntamientoResponseDto, desbloqueo, { excludeExtraneousValues: true });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDesbloqueosAyuntamientoDto,
  ): Promise<DesbloqueosAyuntamientoResponseDto> {
    const desbloqueo = await this.desbloqueosService.updateDesbloqueo(id, updateDto);
    if (!desbloqueo) {
      throw new Error('Desbloqueo no encontrado');
    }
    return plainToClass(DesbloqueosAyuntamientoResponseDto, desbloqueo, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.desbloqueosService.delete(id);
    if (!deleted) {
      throw new Error('Desbloqueo no encontrado');
    }
  }
}
