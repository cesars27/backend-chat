import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'https://lightblue-grouse-772536.hostingersite.com',
      'https://lightskyblue-quetzal-821939.hostingersite.com',
      'http://localhost:5173',
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Tino Backend corriendo en puerto ${port}`);
}
bootstrap();