import { Module } from '@nestjs/common';
import { AriMilRsController } from './ari-mil-rs.controller';
import { AriMilRsService } from './ari-mil-rs.service';
import { SupabaseService } from 'src/db/supabase.service';

@Module({
  imports: [],
  controllers: [AriMilRsController],
  providers: [AriMilRsService, SupabaseService],
})
export class AriMilRsModule {}
