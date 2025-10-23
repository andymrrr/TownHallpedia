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
import { EdificioService } from '../services/edificio.service';
import {
  CreateEdificioDto,
  UpdateEdificioDto,
  EdificioResponseDto,
} from '../dto/edificio.dto';
import { plainToClass } from 'class-transformer';

@Controller('edificios')
export class EdificioController {
  constructor(private readonly edificioService: EdificioService) {}

  @Get()
  async findAll(): Promise<EdificioResponseDto[]> {
    const edificios = await this.edificioService.findAll();
    return edificios.map(edificio => 
      plainToClass(EdificioResponseDto, edificio, { excludeExtraneousValues: true })
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<EdificioResponseDto> {
    const edificio = await this.edificioService.findOne(id);
    if (!edificio) {
      throw new Error('Edificio no encontrado');
    }
    return plainToClass(EdificioResponseDto, edificio, { excludeExtraneousValues: true });
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string): Promise<EdificioResponseDto[]> {
    const edificios = await this.edificioService.findByTipo(tipo);
    return edificios.map(edificio => 
      plainToClass(EdificioResponseDto, edificio, { excludeExtraneousValues: true })
    );
  }

  @Get(':id/tropas')
  async findWithTropas(@Param('id', ParseIntPipe) id: number): Promise<EdificioResponseDto> {
    const edificio = await this.edificioService.findWithTropas(id);
    if (!edificio) {
      throw new Error('Edificio no encontrado');
    }
    return plainToClass(EdificioResponseDto, edificio, { excludeExtraneousValues: true });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateEdificioDto): Promise<EdificioResponseDto> {
    const edificio = await this.edificioService.createEdificio(createDto);
    return plainToClass(EdificioResponseDto, edificio, { excludeExtraneousValues: true });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEdificioDto,
  ): Promise<EdificioResponseDto> {
    const edificio = await this.edificioService.updateEdificio(id, updateDto);
    if (!edificio) {
      throw new Error('Edificio no encontrado');
    }
    return plainToClass(EdificioResponseDto, edificio, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.edificioService.delete(id);
    if (!deleted) {
      throw new Error('Edificio no encontrado');
    }
  }
}
