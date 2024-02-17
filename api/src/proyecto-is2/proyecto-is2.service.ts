import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/db/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { DB_RESPONSE } from './utils/db-response';
import {
  dataItemCategoria,
  dataItemEmpleado,
  dataItemFamilia,
  dataItemGenero,
  dataItemPuesto,
  dataItemSubclase,
  dataItemTipoPago,
} from './queries/proyecto-is2.queries';

const SCHEMA = 'is2';

@Injectable()
export class ProyectoIS2Service {
  private supabase: SupabaseClient<any, 'public', any>;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
  }

  EMPLEADOS = {
    getEmpleados: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('empleados')
        .select(dataItemEmpleado)
        .order('nombre', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'empleados',
        error,
        'Error al obtener empleados',
      ).sendResponse();
    },
  };

  PUESTOS = {
    getPuestos: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('puestos')
        .select(dataItemPuesto)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'puestos',
        error,
        'Error al obtener puestos',
      ).sendResponse();
    },
  };

  GENEROS = {
    getGeneros: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('generos')
        .select(dataItemGenero)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al obtener generos',
      ).sendResponse();
    },
  };

  TIPO_PAGO = {
    getTipoPago: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('tipos_pago')
        .select(dataItemTipoPago)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'tipos_pago',
        error,
        'Error al obtener tipos de pago',
      ).sendResponse();
    },
  };

  FAMILIAS = {
    getFamilias: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('familias')
        .select(dataItemFamilia)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'familias',
        error,
        'Error al obtener familias',
      ).sendResponse();
    },
  };

  CATEGORIAS = {
    getCategorias: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('categorias')
        .select(dataItemCategoria)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'categorias',
        error,
        'Error al obtener categorias',
      ).sendResponse();
    },
  };

  SUBCLASES = {
    getSubclases: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('subclases')
        .select(dataItemSubclase)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'subclases',
        error,
        'Error al obtener subclases',
      ).sendResponse();
    },
  };
}
