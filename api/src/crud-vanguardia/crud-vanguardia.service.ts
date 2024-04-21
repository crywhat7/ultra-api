/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/db/supabase.service';
import { dataItemCliente } from 'src/proyecto-is2/queries/proyecto-is2.queries';
import { DB_RESPONSE } from 'src/utils/db-response';

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
          .select(dataItemCliente)
          .order('id', { ascending: true });
  
        return new DB_RESPONSE<typeof data>(
          data,
          'clientes',
          error,
          'Error al obtener clientes',
        ).sendResponse();
      },
};
}
