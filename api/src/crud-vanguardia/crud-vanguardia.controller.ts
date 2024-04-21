import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CrudVanguardiaService } from './crud-vanguardia.service';
import { CreateClienteCrudDto } from './dtos/CreateCliente.dto';
import { UpdateClienteCrudDto } from './dtos/UpdateCliente.dto';

@Controller('crud-vanguardia')
export class CrudVanguardiaController {
  constructor(private readonly crudVanguardiaSvc: CrudVanguardiaService) {}

  @Get('clientes')
  async getClientes() {
    return await this.crudVanguardiaSvc.CLIENTES.getClientes();
  }
  @Get('clientes/:id')
  async getClienteById(@Param('id') id: number) {
    return await this.crudVanguardiaSvc.CLIENTES.getClienteById(id);
  }
  @Post('createCliente')
  async postCliente(@Body() cliente: CreateClienteCrudDto) {
    return await this.crudVanguardiaSvc.CLIENTES.postCliente(cliente);
  }
  @Put('updateCliente/:id')
  async putCliente(
    @Param('id') id: number,
    @Body() cliente: UpdateClienteCrudDto,
  ) {
    return await this.crudVanguardiaSvc.CLIENTES.updateCliente(id, cliente);
  }
  @Delete('deleteCliente/:id')
  async deleteCliente(@Param('id') id: number) {
    return await this.crudVanguardiaSvc.CLIENTES.deleteCliente(id);
  }
}
