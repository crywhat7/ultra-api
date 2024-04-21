import { CrudVanguardiaModule } from './crud-vanguardia/crud-vanguardia.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { SupabaseModule } from './db/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { AriMilRsModule } from './ari-mil-rs/ari-mil-rs.module';
import { Examen1Module } from './examen-1/examen-1.module';
import { ProyectoIS2Module } from './proyecto-is2/proyecto-is2.module';
import { ProyectoVanguardiaModule } from './proyecto-vanguardia/proyecto-vanguardia.module';
import { CrudVanguardiaController } from './crud-vanguardia/crud-vanguardia.controller';

@Module({
  imports: [
    CrudVanguardiaModule,
    ConfigModule.forRoot({}),
    ProyectoVanguardiaModule,
    ProyectoIS2Module,
    Examen1Module,
    AriMilRsModule,
    VehiculosModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
