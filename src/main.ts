import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  if (config.get('NODE_ENV') !== 'production') {
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'img-src': ["'self'", 'data:', 'https://cdn.jsdelivr.net/'],
          'script-src': [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            'https://cdn.jsdelivr.net/',
          ],
        },
      }),
    );
  }
  app.enableCors();
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(`/v1`);
  const options = new DocumentBuilder()
    .setTitle(`ULesson App API`)
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`/docs`, app, document);
  const PORT = config.get('PORT') || 8080;
  await app.listen(PORT);
}
bootstrap()
  .then(() => {
    Logger.log(`API Server started`, 'Bootstrap');
  })
  .catch((err) => {
    Logger.error(err, 'Bootstrap');
  });
