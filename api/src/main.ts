import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger/swagger';
import { json, urlencoded } from 'express';

import { config } from './config/config';

import { obtenerCertificados } from './config/obtenerCertificados';
import { readFileSync } from 'fs';

async function bootstrap() {
  const { port, usarCertificados } = config;
  let app = null;

  if (usarCertificados) {
    try {
      const certificados = await obtenerCertificados();
      console.log('certificados', certificados);
      const httpsOptions = {
        cert: readFileSync(certificados.SSLCertificateFile),
        ca: readFileSync(certificados.SSLCACertificateFile),
        key: readFileSync(certificados.SSLCertificateKeyFile),
      };

      app = await NestFactory.create(AppModule, {
        httpsOptions,
      });
    } catch (error) {
      console.log('Error al obtener los certificados', error);
    }
  } else {
    app = await NestFactory.create(AppModule);
  }

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(port).then(() => {
    console.log(`Server running on port ${port}`);
  });
}
bootstrap();
