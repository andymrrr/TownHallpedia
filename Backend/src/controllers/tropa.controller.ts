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

@Controller('tropas')
export class TropaController {
  constructor(private readonly tropaService: TropaService) {}

  @Get()
  async findAll(): Promise<TropaResponseDto[]> {
    const tropas = await this.tropaService.findAll();
    return tropas.map(tropa => 
      plainToClass(TropaResponseDto, tropa, { excludeExtraneousValues: true })
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TropaResponseDto> {
    const tropa = await this.tropaService.findOne(id);
    if (!tropa) {
      throw new Error('Tropa no encontrada');
    }
    return plainToClass(TropaResponseDto, tropa, { excludeExtraneousValues: true });
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string): Promise<TropaResponseDto[]> {
    const tropas = await this.tropaService.findByTipo(tipo);
    return tropas.map(tropa => 
      plainToClass(TropaResponseDto, tropa, { excludeExtraneousValues: true })
    );
  }

  @Get('cuartel/:cuartelId')
  async findByCuartel(@Param('cuartelId', ParseIntPipe) cuartelId: number): Promise<TropaResponseDto[]> {
    const tropas = await this.tropaService.findByCuartel(cuartelId);
    return tropas.map(tropa => 
      plainToClass(TropaResponseDto, tropa, { excludeExtraneousValues: true })
    );
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<TropaResponseDto> {
    const tropa = await this.tropaService.findWithRelations(id);
    if (!tropa) {
      throw new Error('Tropa no encontrada');
    }
    return plainToClass(TropaResponseDto, tropa, { excludeExtraneousValues: true });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateTropaDto): Promise<TropaResponseDto> {
    const tropa = await this.tropaService.createTropa(createDto);
    return plainToClass(TropaResponseDto, tropa, { excludeExtraneousValues: true });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTropaDto,
  ): Promise<TropaResponseDto> {
    const tropa = await this.tropaService.updateTropa(id, updateDto);
    if (!tropa) {
      throw new Error('Tropa no encontrada');
    }
    return plainToClass(TropaResponseDto, tropa, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.tropaService.delete(id);
    if (!deleted) {
      throw new Error('Tropa no encontrada');
    }
  }
}
