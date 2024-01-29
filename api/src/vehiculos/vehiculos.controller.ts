import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateVehiculoDTO } from './dtos/Vehiculo.dto';

@ApiTags('Vehiculos')
@Controller('vehiculos')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Get()
  async getVehiculos() {
    return await this.vehiculosService.getVehiculos();
  }

  @Get(':id')
  async getVehiculoById(@Param('id') id: string) {
    return await this.vehiculosService.getVehiculoById(id);
  }

  @Get('opt/marcas')
  async getVehiculosMarcas() {
    return await this.vehiculosService.getVehiculosMarcas();
  }

  @Get('opt/marcas/:idMarca/modelos')
  async getVehiculosModelos(@Param('idMarca') idMarca: string) {
    return await this.vehiculosService.getVehiculosModelos(idMarca);
  }

  @Get('opt/tipos-transmision')
  async getVehiculosTiposTransmision() {
    return await this.vehiculosService.getVehiculosTiposTransmision();
  }

  @Post()
  async createVehiculo(@Body() body: CreateVehiculoDTO) {
    return await this.vehiculosService.createVehiculo(body);
  }

  @Delete(':id')
  async deleteVehiculo(@Param('id') id: string) {
    return await this.vehiculosService.deleteVehiculo(id);
  }
}
