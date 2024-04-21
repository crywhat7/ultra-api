/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { CrudVanguardiaService } from './crud-vanguardia.service';

@Controller('crud-vanguardia')
export class CrudVanguardiaController {
  constructor(private readonly crudVanguardiaSvc: CrudVanguardiaService) {}

  @Get('clientes')
  async getClientes() {
    return await this.crudVanguardiaSvc.CLIENTES.getClientes();
  }
}
