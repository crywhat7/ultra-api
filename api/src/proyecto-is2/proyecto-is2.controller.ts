import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProyectoIS2Service } from './proyecto-is2.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dtos/CreateEmployee.dto';
import { SetStatusAndObvservacionesDto } from './dtos/SetStatusAndObservaciones.dto';
import { UploadImageDto } from './dtos/UploadImage.dto';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProducto.dto';
import { UpdatePrecioProductDto } from './dtos/UpdatePrecioProducto.dto';

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
  @Get('empleados/:id')
  async getEmpleadoById(@Param('id') id: number) {
    return await this.proyectoIS2Service.EMPLEADOS.getEmpleadoById(id);
  }
  @Post('empleados')
  async postEmpleado(@Body() empleado: CreateEmployeeDto) {
    return await this.proyectoIS2Service.EMPLEADOS.postEmpleado(empleado);
  }
  @Put('empleados/:id')
  async putEmpleado(
    @Param('id') id: number,
    @Body() empleado: CreateEmployeeDto,
  ) {
    return await this.proyectoIS2Service.EMPLEADOS.updateEmpleado(id, empleado);
  }
  @Patch('empleados/setStatusAndObservaciones/:id')
  async patchEmpleadoStatusAndObservaciones(
    @Param('id') id: number,
    @Body() body: SetStatusAndObvservacionesDto,
  ) {
    return await this.proyectoIS2Service.EMPLEADOS.updateStatusAndObservacionesEmpleado(
      id,
      body.inhabilitado,
      body.observaciones,
    );
  }
  @Post('empleados/uploadImage/:id')
  async postEmpleadoImage(
    @Param('id') id: number,
    @Body() body: UploadImageDto,
  ) {
    return await this.proyectoIS2Service.EMPLEADOS.uploadImageToEmpleado(
      id,
      body.base64,
    );
  }

  @Delete('empleados/:id')
  async deleteEmpleado(@Param('id') id: number) {
    return await this.proyectoIS2Service.EMPLEADOS.deleteEmpleado(id);
  }

  // ! Login
  @Get('login/:emailOrAlias/:password')
  async loginUser(
    @Param('emailOrAlias') emailOrAlias: string,
    @Param('password') password: string,
  ) {
    return await this.proyectoIS2Service.LOGIN.loginUser(
      emailOrAlias,
      password,
    );
  }

  // ! Generos
  @Get('generos')
  async getGeneros() {
    return await this.proyectoIS2Service.GENEROS.getGeneros();
  }

  // ! Tipo de Pago
  @Get('tipo-pago')
  async getTipoPago() {
    return await this.proyectoIS2Service.TIPO_PAGO.getTipoPago();
  }

  // ! Forma de Pago
  @Get('forma-pago')
  async getFormaPago() {
    return await this.proyectoIS2Service.FORMA_PAGO.getFormaPago();
  }

  // ! Tipos de Unidad
  @Get('tipos-unidades')
  async getTiposUnidades() {
    return await this.proyectoIS2Service.TIPOS_UNIDADES.getTiposUnidades();
  }

  // ! Familias
  @Get('familias')
  async getFamilias() {
    return await this.proyectoIS2Service.FAMILIAS.getFamilias();
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

  // ! Productos
  @Get('productos')
  async getProductos() {
    return await this.proyectoIS2Service.PRODUCTOS.getProductos();
  }
  @Get('productos/:id')
  async getProductoById(@Param('id') id: number) {
    return await this.proyectoIS2Service.PRODUCTOS.getProductoById(id);
  }
  @Post('productos')
  async postProducto(@Body() producto: CreateProductDto) {
    return await this.proyectoIS2Service.PRODUCTOS.postProducto(producto);
  }
  @Put('productos/:id')
  async putProducto(
    @Param('id') id: number,
    @Body() producto: UpdateProductDto,
  ) {
    return await this.proyectoIS2Service.PRODUCTOS.updateProducto(id, producto);
  }
  @Delete('productos/:id')
  async deleteProducto(@Param('id') id: number) {
    return await this.proyectoIS2Service.PRODUCTOS.deleteProducto(id);
  }
  @Post('productos/uploadImage/:id')
  async postProductoImage(
    @Param('id') id: number,
    @Body() body: UploadImageDto,
  ) {
    return await this.proyectoIS2Service.PRODUCTOS.uploadImageToProducto(
      id,
      body.base64,
    );
  }

  // ! Precio Producto
  @Post('precios-productos/:idProducto')
  async getPreciosProductos(
    @Param('idProducto') idProducto: number,
    @Body() body: UpdatePrecioProductDto,
  ) {
    return await this.proyectoIS2Service.PRECIOS_PRODUCTOS.setPrecioProducto(
      idProducto,
      body.idTipoUnidad,
      body.precio,
    );
  }
  @Delete('precios-productos/:id')
  async deletePrecioProducto(@Param('id') id: number) {
    return await this.proyectoIS2Service.PRECIOS_PRODUCTOS.deletePrecioProducto(
      id,
    );
  }

  // ! Marcas
  @Get('marcas')
  async getMarcas() {
    return await this.proyectoIS2Service.MARCAS.getMarcas();
  }

  // ! Clientes
  @Get('clientes')
  async getClientes() {
    return await this.proyectoIS2Service.CLIENTES.getClientes();
  }
}
