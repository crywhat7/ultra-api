/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/db/supabase.service';
import { dataItemClienteCrud } from 'src/proyecto-is2/queries/proyecto-is2.queries';
import { DB_RESPONSE } from 'src/utils/db-response';
import { CreateClienteCrudDto } from './dtos/CreateCliente.dto';
import { UpdateClienteCrudDto } from './dtos/UpdateCliente.dto';

const SCHEMA = 'kometha';

@Injectable()
export class CrudVanguardiaService {
  private supabase: SupabaseClient<any, 'public', any>;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
  }

  CLIENTES = {
    getClientes: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('clientes')
        .select(dataItemClienteCrud)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'clientes',
        error,
        'Error al obtener clientes',
      ).sendResponse();
    },
    getClienteById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('clientes')
        .select(dataItemClienteCrud)
        .eq('id', id)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'clientes',
        error,
        'Error al obtener producto',
      ).sendResponse();
    },

    postCliente: async (cliente: CreateClienteCrudDto) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('clientes')
        .insert({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          saldo: cliente.saldo,
          direccion: cliente.direccion,
        })
        .select(dataItemClienteCrud)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'nuevoProducto',
        error,
        'Error al crear producto',
      ).sendResponse();
    },
    updateCliente: async (id: number, cliente: UpdateClienteCrudDto) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('clientes')
        .update({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          saldo: cliente.saldo,
          direccion: cliente.direccion,
          inactivo: cliente.inactivo,
        })
        .eq('id', id)
        .select(dataItemClienteCrud)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'actualizarCliente',
        error,
        'Error al actualizar cliente',
      ).sendResponse();
    },
    deleteCliente: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('clientes')
        .delete()
        .eq('id', id)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'eliminarCliente',
        error,
        'Error al eliminar cliente',
      ).sendResponse();
    },
  };
}
