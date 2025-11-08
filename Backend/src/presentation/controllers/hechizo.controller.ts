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
import { HechizoService } from '../../application/services/hechizo.service';
import {
  CreateHechizoDto,
  UpdateHechizoDto,
  HechizoResponseDto,
} from '../dto/hechizo.dto';
import { plainToClass } from 'class-transformer';
import { Respuesta, ok } from '../../common/respuesta/respuesta';
import { PaginationPipe } from '../pipes/pagination.pipe';
import { PageDto, PaginationQueryDto } from '../../common/pagination/pagination.dto';
import { Hechizo } from '../../infrastructure/persistence/entities/hechizo.entity';
import { HechizoConDesbloqueos } from '../../domain/types/desbloqueos.types';

@ApiTags('Hechizos')
@Controller('hechizos')
export class HechizoController {
  constructor(private readonly hechizoService: HechizoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los hechizos' })
  @ApiOkResponse({
    description: 'Lista de hechizos obtenida exitosamente',
    type: [HechizoResponseDto],
  })
  async findAll(): Promise<Respuesta<Hechizo[]>> {
    const hechizos = await this.hechizoService.findAll();
    return ok<Hechizo[]>(hechizos);
  }

  @Get('paginacion')
  @ApiOperation({ summary: 'Paginación de hechizos' })
  @UsePipes(new PaginationPipe())
  async paginar(@Query() query: PaginationQueryDto): Promise<Respuesta<PageDto<Hechizo>>> {
    const page = await this.hechizoService.paginate(query);
    return ok<PageDto<Hechizo>>(page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener hechizo por ID' })
  @ApiParam({ name: 'id', description: 'ID del hechizo', type: 'integer' })
  @ApiOkResponse({
    description: 'Hechizo encontrado exitosamente',
    type: HechizoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Hechizo no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<Hechizo>> {
    const hechizo = await this.hechizoService.findOne(id);
    if (!hechizo) {
      throw new NotFoundException('Hechizo no encontrado');
    }
    return ok<Hechizo>(hechizo);
  }

  @Get('tipo/:tipo')
  @ApiOperation({ summary: 'Obtener hechizos por tipo' })
  @ApiParam({ name: 'tipo', description: 'Tipo de hechizo', type: 'string' })
  @ApiOkResponse({
    description: 'Lista de hechizos obtenida exitosamente',
    type: [HechizoResponseDto],
  })
  async findByTipo(@Param('tipo') tipo: string): Promise<Respuesta<Hechizo[]>> {
    const hechizos = await this.hechizoService.findByTipo(tipo);
    return ok<Hechizo[]>(hechizos);
  }

  @Get('espacio/:espacioHechizo')
  @ApiOperation({ summary: 'Obtener hechizos por espacio' })
  @ApiParam({ name: 'espacioHechizo', description: 'Espacio del hechizo', type: 'integer' })
  @ApiOkResponse({
    description: 'Lista de hechizos obtenida exitosamente',
    type: [HechizoResponseDto],
  })
  async findByEspacioHechizo(@Param('espacioHechizo', ParseIntPipe) espacioHechizo: number): Promise<Respuesta<Hechizo[]>> {
    const hechizos = await this.hechizoService.findByEspacioHechizo(espacioHechizo);
    return ok<Hechizo[]>(hechizos);
  }

  @Get(':id/relaciones')
  @ApiOperation({ summary: 'Obtener hechizo con relaciones' })
  @ApiParam({ name: 'id', description: 'ID del hechizo', type: 'integer' })
  @ApiOkResponse({
    description: 'Hechizo con relaciones obtenido exitosamente',
    type: HechizoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Hechizo no encontrado' })
  async findWithRelations(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<Hechizo>> {
    const hechizo = await this.hechizoService.findWithRelations(id);
    if (!hechizo) {
      throw new NotFoundException('Hechizo no encontrado');
    }
    return ok<Hechizo>(hechizo);
  }

  @Get(':id/desbloqueos')
  @ApiOperation({ summary: 'Obtener hechizo con desbloqueos' })
  @ApiParam({ name: 'id', description: 'ID del hechizo', type: 'integer' })
  @ApiOkResponse({
    description: 'Hechizo con desbloqueos obtenido exitosamente',
    type: HechizoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Hechizo no encontrado' })
  async findWithDesbloqueos(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<HechizoConDesbloqueos>> {
    const hechizo = await this.hechizoService.findWithDesbloqueos(id);
    if (!hechizo) {
      throw new NotFoundException('Hechizo no encontrado');
    }
    return ok<HechizoConDesbloqueos>(hechizo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear nuevo hechizo' })
  @ApiBody({ type: CreateHechizoDto })
  @ApiCreatedResponse({
    description: 'Hechizo creado exitosamente',
    type: HechizoResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
  async create(@Body() createDto: CreateHechizoDto): Promise<Respuesta<Hechizo>> {
    const hechizo = await this.hechizoService.createHechizo(createDto);
    return ok<Hechizo>(hechizo, 'Creado exitosamente');
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar hechizo existente' })
  @ApiParam({ name: 'id', description: 'ID del hechizo', type: 'integer' })
  @ApiBody({ type: UpdateHechizoDto })
  @ApiOkResponse({
    description: 'Hechizo actualizado exitosamente',
    type: HechizoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Hechizo no encontrado' })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateHechizoDto,
  ): Promise<Respuesta<Hechizo>> {
    const hechizo = await this.hechizoService.updateHechizo(id, updateDto);
    if (!hechizo) {
      throw new NotFoundException('Hechizo no encontrado');
    }
    return ok<Hechizo>(hechizo, 'Actualizado exitosamente');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar hechizo' })
  @ApiParam({ name: 'id', description: 'ID del hechizo', type: 'integer' })
  @ApiResponse({ status: 204, description: 'Hechizo eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Hechizo no encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Respuesta<void>> {
    const deleted = await this.hechizoService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Hechizo no encontrado');
    }
    return ok<void>(undefined, 'Eliminado exitosamente');
  }
}
