import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { SupabaseModule } from './db/supabase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({}), VehiculosModule, SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
