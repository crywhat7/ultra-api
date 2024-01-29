import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [],
  providers: [SupabaseService],
})
export class SupabaseModule {}
