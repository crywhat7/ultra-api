import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/db/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { DB_RESPONSE } from './utils/db-response';

@Injectable()
export class ProyectoIS2Service {
  private supabase: SupabaseClient<any, 'public', any>;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
  }

  EMPLEADOS = {
    getEmpleados: async () => {
      const { data, error } = await this.supabase
        .schema('is2')
        .from('empleados')
        .select('*');

      return new DB_RESPONSE<any[]>(
        data,
        'empleados',
        error,
        'Error al obtener empleados',
      ).sendResponse();
    },
  };
}
