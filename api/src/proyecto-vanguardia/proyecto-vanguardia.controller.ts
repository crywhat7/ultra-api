import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProyectoVanguardiaService } from './proyecto-vanguardia.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRolDto } from './dtos/rol.dto';

@ApiTags('Proyecto Vanguardia - ATM')
@Controller('atm')
export class ProyectoVanguardiaController {
  constructor(private readonly pryVanguardiaSrv: ProyectoVanguardiaService) {}
  // ! Roles
  @Get('roles')
  async getRoles() {
    return await this.pryVanguardiaSrv.ROLES.getRoles();
  }
  @Get('roles/:id')
  async getRol(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.ROLES.getRol(id);
  }
  @Post('roles')
  async crearRol(@Body() body: CreateRolDto) {
    return await this.pryVanguardiaSrv.ROLES.crearRol(body);
  }
  @Put('roles/:id')
  async actualizarRol(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateRolDto,
  ) {
    return await this.pryVanguardiaSrv.ROLES.editarRol({ id, ...body });
  }
  @Delete('roles/:id')
  async eliminarRol(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.ROLES.deleteRol(id);
  }
}
