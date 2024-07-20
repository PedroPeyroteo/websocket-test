import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for the entire application
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith('http://192.168.1.')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true, // If your application requires credentials
  });

  const port = 3000; // Ensure this port is correct
  await app.listen(port, '0.0.0.0');
  console.log(`Nest server is running on http://0.0.0.0:${port}`);
}
bootstrap();
