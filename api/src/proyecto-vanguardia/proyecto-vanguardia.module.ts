import { Module } from '@nestjs/common';
import { ProyectoVanguardiaController } from './proyecto-vanguardia.controller';
import { ProyectoVanguardiaService } from './proyecto-vanguardia.service';
import { SupabaseService } from 'src/db/supabase.service';

@Module({
  imports: [],
  controllers: [ProyectoVanguardiaController],
  providers: [ProyectoVanguardiaService, SupabaseService],
})
export class ProyectoVanguardiaModule {}
