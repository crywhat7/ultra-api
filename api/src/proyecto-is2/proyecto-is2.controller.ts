import { Controller, Get } from '@nestjs/common';
import { ProyectoIS2Service } from './proyecto-is2.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proyecto Ingenieria de Software 2')
@Controller('proyecto-is2')
export class ProyectoIS2Controller {
  constructor(private readonly proyectoIS2Service: ProyectoIS2Service) {}

  // ! Puestos
  @Get('puestos')
  async getPuestos() {
    return await this.proyectoIS2Service.PUESTOS.getPuestos();
  }

  // ! Empleados
  @Get('empleados')
  async getEmpleados() {
    return await this.proyectoIS2Service.EMPLEADOS.getEmpleados();
  }

  // ! Generos
  @Get('generos')
  async getGeneros() {
    return await this.proyectoIS2Service.GENEROS.getGeneros();
  }

  // ! Familias
  @Get('familias')
  async getFamilias() {
    return await this.proyectoIS2Service.FAMILIAS.getFamilias();
  }

  // ! Tipo de Pago
  @Get('tipo-pago')
  async getTipoPago() {
    return await this.proyectoIS2Service.TIPO_PAGO.getTipoPago();
  }

  // ! Categorias
  @Get('categorias')
  async getCategorias() {
    return await this.proyectoIS2Service.CATEGORIAS.getCategorias();
  }

  // ! Subclases
  @Get('subclases')
  async getSubclases() {
    return await this.proyectoIS2Service.SUBCLASES.getSubclases();
  }
}
