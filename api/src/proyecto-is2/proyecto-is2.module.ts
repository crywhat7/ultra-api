import { Module } from '@nestjs/common';
import { ProyectoIS2Controller } from './proyecto-is2.controller';
import { ProyectoIS2Service } from './proyecto-is2.service';
import { SupabaseService } from 'src/db/supabase.service';

@Module({
  imports: [],
  controllers: [ProyectoIS2Controller],
  providers: [ProyectoIS2Service, SupabaseService],
})
export class ProyectoIS2Module {}
