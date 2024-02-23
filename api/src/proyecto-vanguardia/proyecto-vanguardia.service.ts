import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/db/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  dataItemGenero,
  dataItemRol,
} from './queries/proyecto-vanguardia.queries';
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

    getRolById: async (id: number) => {
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
  GENEROS = {
    getGeneros: async () => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('generos')
        .select(dataItemGenero);

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al obtener generos',
      ).sendResponse();
    },
    getGeneroById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('generos')
        .select(dataItemGenero)
        .eq('id', id);

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al obtener genero',
      ).sendResponse();
    },
    crearGenero: async ({ descripcion }: { descripcion: string }) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('generos')
        .insert({ descripcion })
        .select(dataItemGenero);

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al crear genero',
      ).sendResponse();
    },
    editarGenero: async ({
      id,
      descripcion,
    }: {
      id: number;
      descripcion: string;
    }) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('generos')
        .update({ descripcion })
        .eq('id', id)
        .select(dataItemGenero);

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al editar genero',
      ).sendResponse();
    },
    deleteGenero: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(ESQUEMA)
        .from('generos')
        .delete()
        .eq('id', id)
        .select(dataItemGenero);

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al eliminar genero',
      ).sendResponse();
    },
  };
}
