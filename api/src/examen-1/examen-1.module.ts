import { Module } from '@nestjs/common';
import { Examen1Controller } from './examen-1.controller';
import { Examen1Service } from './examen-1.service';
import { SupabaseService } from 'src/db/supabase.service';

@Module({
  imports: [],
  controllers: [Examen1Controller],
  providers: [Examen1Service, SupabaseService],
})
export class Examen1Module {}
