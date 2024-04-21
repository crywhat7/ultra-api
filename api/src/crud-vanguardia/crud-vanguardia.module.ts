import { CrudVanguardiaService } from './crud-vanguardia.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CrudVanguardiaController } from './crud-vanguardia.controller';
import { SupabaseService } from 'src/db/supabase.service';

@Module({
  imports: [],
  controllers: [CrudVanguardiaController],
  providers: [CrudVanguardiaService, SupabaseService],
})
export class CrudVanguardiaModule {}
