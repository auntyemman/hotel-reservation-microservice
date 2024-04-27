import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { HotelReservationMsLogger } from './common/interceptor/logger.interceptor';
import * as http from 'http';

async function bootstrap() {
  const logger = new Logger('HotelReservationMicroservice');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.HOTEL_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  app.useGlobalInterceptors(new HotelReservationMsLogger());

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.end('Welcome to Hotel reservation');
  });

  server.listen(5003);

  await app
    .listen()
    .finally(() => logger.log(`Hotel Reservation Microservice`));
}
bootstrap();
