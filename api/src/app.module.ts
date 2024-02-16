import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { SupabaseModule } from './db/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { AriMilRsModule } from './ari-mil-rs/ari-mil-rs.module';
import { Examen1Module } from './examen-1/examen-1.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    VehiculosModule,
    AriMilRsModule,
    Examen1Module,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
