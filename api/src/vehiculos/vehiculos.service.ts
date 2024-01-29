import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/db/supabase.service';
import { dataItemVehiculo } from './queries/data-item-vehiculo';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateVehiculoDTO } from './dtos/Vehiculo.dto';

@Injectable()
export class VehiculosService {
  supabase: SupabaseClient<any, 'public', any>;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
  }
  async getVehiculos() {
    const { data: vehiculos, error } = await this.supabase
      .schema('public')
      .from('vehiculos')
      .select(dataItemVehiculo);
    if (error) {
      throw error;
    }
    return vehiculos;
  }

  async getVehiculoById(id: string) {
    const { data: vehiculo, error } = await this.supabase
      .schema('public')
      .from('vehiculos')
      .select(dataItemVehiculo)
      .eq('id', id);
    if (error) {
      throw error;
    }
    return vehiculo;
  }

  async getVehiculosMarcas() {
    const { data: vehiculosMarcas, error } = await this.supabase
      .schema('public')
      .from('vehiculos_marcas')
      .select('*');
    if (error) {
      throw error;
    }
    return vehiculosMarcas;
  }

  async getVehiculosModelos(idMarca: string) {
    const { data: vehiculosMarcasModelos, error } = await this.supabase
      .schema('public')
      .from('vehiculos_marcas_modelos')
      .select('*')
      .eq('brand', idMarca);
    if (error) {
      throw error;
    }
    return vehiculosMarcasModelos;
  }

  async getVehiculosTiposTransmision() {
    const { data: vehiculosTiposTransmision, error } = await this.supabase
      .schema('public')
      .from('vehiculos_tipos_transmision')
      .select('*');
    if (error) {
      throw error;
    }
    return vehiculosTiposTransmision;
  }

  async createVehiculo(vehiculo: CreateVehiculoDTO) {
    const { data: vehiculos, error } = await this.supabase
      .schema('public')
      .from('vehiculos')
      .insert([vehiculo])
      .select(dataItemVehiculo);
    if (error) {
      throw error;
    }
    return vehiculos;
  }

  async deleteVehiculo(id: string) {
    const { data: vehiculos, error } = await this.supabase
      .schema('public')
      .from('vehiculos')
      .delete()
      .eq('id', id);
    if (error) {
      throw error;
    }
    return vehiculos;
  }
}
