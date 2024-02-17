import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CRUD API - Tareas Variadas')
  .setDescription('La API para diferentes Tareas de Ari o Cry')
  .setVersion('1.0')
  .build();
