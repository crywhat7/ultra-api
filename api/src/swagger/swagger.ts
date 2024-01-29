import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CRUD API - Vehiculos y Red Social')
  .setDescription('La API de CRUD para vehiculos y red social')
  .setVersion('1.0')
  .addTag('Vehiculos')
  .addTag('Ari-Mil Red Social')
  .build();
