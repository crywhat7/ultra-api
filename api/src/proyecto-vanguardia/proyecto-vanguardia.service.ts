import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/db/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { dataItemRol } from './queries/proyecto-vanguardia.queries';
import { DB_RESPONSE } from 'src/utils/db-response';

const ESQUEMA = 'atm';

@Injectable()
export class ProyectoVanguardiaService {
  supabase: SupabaseClient<any, 'public', any>;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
  }

  ROLES = {
    getRoles: async () => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('roles')
        .select(dataItemRol)
        .order('created_at', { ascending: false });

      return new DB_RESPONSE<typeof data>(
        data,
        'roles',
        error,
        'Error al obtener roles',
      ).sendResponse();
    },

    getRol: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('roles')
        .select(dataItemRol)
        .eq('id', id);

      return new DB_RESPONSE<typeof data>(
        data,
        'roles',
        error,
        'Error al obtener rol',
      ).sendResponse();
    },

    crearRol: async ({
      descripcion,
      esAdmin,
    }: {
      descripcion: string;
      esAdmin: boolean;
    }) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('roles')
        .insert({ descripcion, es_admin: esAdmin })
        .select(dataItemRol);

      return new DB_RESPONSE<typeof data>(
        data,
        'roles',
        error,
        'Error al crear rol',
      ).sendResponse();
    },
    editarRol: async ({
      id,
      descripcion,
      esAdmin,
    }: {
      id: number;
      descripcion: string;
      esAdmin: boolean;
    }) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('roles')
        .update({ descripcion, es_admin: esAdmin })
        .eq('id', id)
        .select(dataItemRol);

      return new DB_RESPONSE<typeof data>(
        data,
        'roles',
        error,
        'Error al editar rol',
      ).sendResponse();
    },
    deleteRol: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('roles')
        .delete()
        .eq('id', id)
        .select(dataItemRol);

      return new DB_RESPONSE<typeof data>(
        data,
        'roles',
        error,
        'Error al eliminar rol',
      ).sendResponse();
    },
  };
}
