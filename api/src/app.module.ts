import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { SupabaseModule } from './db/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { AriMilRsModule } from './ari-mil-rs/ari-mil-rs.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    VehiculosModule,
    AriMilRsModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
