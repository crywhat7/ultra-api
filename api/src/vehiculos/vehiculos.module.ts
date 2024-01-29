import { Module } from '@nestjs/common';
import { VehiculosController } from './vehiculos.controller';
import { VehiculosService } from './vehiculos.service';
import { SupabaseService } from 'src/db/supabase.service';

@Module({
  imports: [],
  controllers: [VehiculosController],
  providers: [VehiculosService, SupabaseService],
})
export class VehiculosModule {}
