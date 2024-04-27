import { Module } from '@nestjs/common';
import { HotelReservationService } from './hotel-reservation.service';
import { HotelReservationController } from './hotel-reservation.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HotelReservationRepository } from './hotel-reservation.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HotelReservation,
  HotelReservationSchema,
} from './entities/hotel-reservation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HotelReservation.name, schema: HotelReservationSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: 'HOTEL_RESERVATION_SERVICE',
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: config.get('RABBITMQ_URL'),
            queue: config.get('HOTEL_QUEUE'),
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [HotelReservationController],
  providers: [
    HotelReservationService,
    ConfigService,
    HotelReservationRepository,
  ],
  exports: [HotelReservationService],
})
export class HotelReservationModule {}
