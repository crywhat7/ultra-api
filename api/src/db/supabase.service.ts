import { Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  public readonly supabase: SupabaseClient<any, 'public', any> = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );
}
