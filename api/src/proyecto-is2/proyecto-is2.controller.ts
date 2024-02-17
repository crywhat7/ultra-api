import { Controller, Get } from '@nestjs/common';
import { ProyectoIS2Service } from './proyecto-is2.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proyecto Ingenieria de Software 2')
@Controller('proyecto-is2')
export class ProyectoIS2Controller {
  constructor(private readonly proyectoIS2Service: ProyectoIS2Service) {}

  // ! Empleados
  @Get('empleados')
  async getEmpleados() {
    return await this.proyectoIS2Service.EMPLEADOS.getEmpleados();
  }
}
