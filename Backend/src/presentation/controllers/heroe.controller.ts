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
import { HeroeService } from '../../application/services/heroe.service';
import {
  CreateHeroeDto,
  UpdateHeroeDto,
  HeroeResponseDto,
} from '../dto/heroe.dto';
import { plainToClass } from 'class-transformer';
import { Respuesta, ok } from '../../common/respuesta/respuesta';
import { PaginationPipe } from '../pipes/pagination.pipe';
import { PageDto, PaginationQueryDto } from '../../common/pagination/pagination.dto';

@ApiTags('Héroes')
@Controller('heroes')
export class HeroeController {
  constructor(private readonly heroeService: HeroeService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los héroes' })
  @ApiOkResponse({
    description: 'Lista de héroes obtenida exitosamente',
    type: [HeroeResponseDto],
  })
  async findAll(): Promise<Respuesta<any[]>> {
    const heroes = await this.heroeService.findAll();
    return ok<any[]>(heroes);
  }

  @Get('paginacion')
  @ApiOperation({ summary: 'Paginación de héroes' })
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): Promise<Respuesta<PageDto<any>>> {
    const page = await this.heroeService.paginate(query);
    return ok<PageDto<any>>(page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener héroe por ID' })
  @ApiParam({ name: 'id', description: 'ID del héroe', type: 'integer' })
  @ApiOkResponse({
    description: 'Héroe encontrado exitosamente',
    type: HeroeResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Héroe no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    const heroe = await this.heroeService.findOne(id);
    if (!heroe) {
      throw new NotFoundException('Héroe no encontrado');
    }
    return ok<any>(heroe);
  }

  @Get('tipo-recurso/:tipoRecurso')
  @ApiOperation({ summary: 'Obtener héroes por tipo de recurso' })
  @ApiParam({ name: 'tipoRecurso', description: 'Tipo de recurso', type: 'string' })
  @ApiOkResponse({
    description: 'Lista de héroes obtenida exitosamente',
    type: [HeroeResponseDto],
  })
  async findByTipoRecurso(@Param('tipoRecurso') tipoRecurso: string): Promise<Respuesta<any[]>> {
    const heroes = await this.heroeService.findByTipoRecurso(tipoRecurso);
    return ok<any[]>(heroes);
  }

  @Get(':id/relaciones')
  @ApiOperation({ summary: 'Obtener héroe con relaciones' })
  @ApiParam({ name: 'id', description: 'ID del héroe', type: 'integer' })
  @ApiOkResponse({
    description: 'Héroe con relaciones obtenido exitosamente',
    type: HeroeResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Héroe no encontrado' })
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    const heroe = await this.heroeService.findWithRelations(id);
    if (!heroe) {
      throw new NotFoundException('Héroe no encontrado');
    }
    return ok<any>(heroe);
  }

  @Get(':id/desbloqueos')
  @ApiOperation({ summary: 'Obtener héroe con desbloqueos' })
  @ApiParam({ name: 'id', description: 'ID del héroe', type: 'integer' })
  @ApiOkResponse({
    description: 'Héroe con desbloqueos obtenido exitosamente',
    type: HeroeResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Héroe no encontrado' })
  async findWithDesbloqueos(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<any>> {
    const heroe = await this.heroeService.findWithDesbloqueos(id);
    if (!heroe) {
      throw new NotFoundException('Héroe no encontrado');
    }
    return ok<any>(heroe);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear nuevo héroe' })
  @ApiBody({ type: CreateHeroeDto })
  @ApiCreatedResponse({
    description: 'Héroe creado exitosamente',
    type: HeroeResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
  async create(@Body() createDto: CreateHeroeDto): Promise<Respuesta<any>> {
    const heroe = await this.heroeService.createHeroe(createDto);
    return ok<any>(heroe, 'Creado exitosamente');
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar héroe existente' })
  @ApiParam({ name: 'id', description: 'ID del héroe', type: 'integer' })
  @ApiBody({ type: UpdateHeroeDto })
  @ApiOkResponse({
    description: 'Héroe actualizado exitosamente',
    type: HeroeResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Héroe no encontrado' })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateHeroeDto,
  ): Promise<Respuesta<any>> {
    const heroe = await this.heroeService.updateHeroe(id, updateDto);
    if (!heroe) {
      throw new NotFoundException('Héroe no encontrado');
    }
    return ok<any>(heroe, 'Actualizado exitosamente');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar héroe' })
  @ApiParam({ name: 'id', description: 'ID del héroe', type: 'integer' })
  @ApiResponse({ status: 204, description: 'Héroe eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Héroe no encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    const deleted = await this.heroeService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Héroe no encontrado');
    }
    return ok<void>(undefined, 'Eliminado exitosamente');
  }
}
