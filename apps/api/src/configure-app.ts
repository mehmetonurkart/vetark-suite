import type { INestApplication } from '@nestjs/common';

export function configureApp(app: INestApplication): void {
  const corsOrigins = process.env.CORS_ORIGIN?.split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: corsOrigins?.length ? corsOrigins : true,
    credentials: true,
  });
}
