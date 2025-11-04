import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  HttpCode,
  UseGuards,
  HttpStatus,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginateClientDto } from './dto/paginate-client.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('clients')
@ApiBearerAuth()
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Solicita a criação de um novo cliente',
    description:
      'Enfileira uma solicitação de criação de cliente no RabbitMQ para processamento assíncrono pelo worker.',
  })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({
    status: 202,
    description: 'Solicitação de criação aceita e enviada para processamento.',
    schema: {
      example: {
        message: 'Cliente enviado para processamento.',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos enviados.' })
  @ApiResponse({ status: 401, description: 'Token JWT ausente ou inválido.' })
  create(@Body() dto: CreateClientDto) {
    this.clientsService.create(dto);
    return {
      message: 'Cliente enviado para processamento.',
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Lista clientes com paginação',
    description:
      'Retorna uma lista de clientes com suporte a filtros e paginação.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Número da página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Quantidade de itens por página',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    example: 'Empresa XPTO',
    description: 'Filtro opcional pelo nome',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes retornada com sucesso',
    schema: {
      example: {
        items: [
          {
            id: 1,
            name: 'Empresa XPTO',
            salary: 5000,
            company_value: 250000,
            userId: 1,
          },
        ],
        total: 1,
        page: 1,
        limit: 10,
      },
    },
  })
  async paginate(@Query() query: PaginateClientDto) {
    return this.clientsService.paginate(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Busca um cliente pelo ID',
    description:
      'Retorna os dados de um cliente específico pelo seu identificador numérico.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado com sucesso',
    schema: {
      example: {
        id: 1,
        name: 'Empresa XPTO',
        salary: 5000,
        company_value: 250000,
        userId: 1,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Atualiza dados de um cliente existente',
    description: 'Permite atualizar um ou mais campos de um cliente.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do cliente a ser atualizado',
  })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso',
    schema: {
      example: {
        id: 1,
        name: 'Empresa Atualizada Ltda',
        salary: 6000,
        company_value: 300000,
        userId: 1,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos enviados' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClientDto,
  ) {
    return this.clientsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove um cliente existente',
    description:
      'Exclui permanentemente um cliente identificado pelo seu ID. É necessário estar autenticado.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do cliente a ser removido',
  })
  @ApiResponse({
    status: 204,
    description: 'Cliente removido com sucesso (sem conteúdo retornado)',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente não encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Token JWT ausente ou inválido',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido ou requisição malformada',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.clientsService.remove(id);
  }
}
