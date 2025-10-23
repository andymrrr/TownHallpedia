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
import { HechizoService } from '../services/hechizo.service';
import {
  CreateHechizoDto,
  UpdateHechizoDto,
  HechizoResponseDto,
} from '../dto/hechizo.dto';
import { plainToClass } from 'class-transformer';

@Controller('hechizos')
export class HechizoController {
  constructor(private readonly hechizoService: HechizoService) {}

  @Get()
  async findAll(): Promise<HechizoResponseDto[]> {
    const hechizos = await this.hechizoService.findAll();
    return hechizos.map(hechizo => 
      plainToClass(HechizoResponseDto, hechizo, { excludeExtraneousValues: true })
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<HechizoResponseDto> {
    const hechizo = await this.hechizoService.findOne(id);
    if (!hechizo) {
      throw new Error('Hechizo no encontrado');
    }
    return plainToClass(HechizoResponseDto, hechizo, { excludeExtraneousValues: true });
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string): Promise<HechizoResponseDto[]> {
    const hechizos = await this.hechizoService.findByTipo(tipo);
    return hechizos.map(hechizo => 
      plainToClass(HechizoResponseDto, hechizo, { excludeExtraneousValues: true })
    );
  }

  @Get('espacio/:espacioHechizo')
  async findByEspacioHechizo(@Param('espacioHechizo', ParseIntPipe) espacioHechizo: number): Promise<HechizoResponseDto[]> {
    const hechizos = await this.hechizoService.findByEspacioHechizo(espacioHechizo);
    return hechizos.map(hechizo => 
      plainToClass(HechizoResponseDto, hechizo, { excludeExtraneousValues: true })
    );
  }

  @Get(':id/relaciones')
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<HechizoResponseDto> {
    const hechizo = await this.hechizoService.findWithRelations(id);
    if (!hechizo) {
      throw new Error('Hechizo no encontrado');
    }
    return plainToClass(HechizoResponseDto, hechizo, { excludeExtraneousValues: true });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateHechizoDto): Promise<HechizoResponseDto> {
    const hechizo = await this.hechizoService.createHechizo(createDto);
    return plainToClass(HechizoResponseDto, hechizo, { excludeExtraneousValues: true });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateHechizoDto,
  ): Promise<HechizoResponseDto> {
    const hechizo = await this.hechizoService.updateHechizo(id, updateDto);
    if (!hechizo) {
      throw new Error('Hechizo no encontrado');
    }
    return plainToClass(HechizoResponseDto, hechizo, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.hechizoService.delete(id);
    if (!deleted) {
      throw new Error('Hechizo no encontrado');
    }
  }
}
