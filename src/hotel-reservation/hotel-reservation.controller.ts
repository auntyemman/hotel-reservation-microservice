import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HotelReservationService } from './hotel-reservation.service';
import { SubscriberPattern } from '../common/interface/subscriber-pattern.interface';
import { CreateReservationDto } from './dto/reservation.dto';

@Controller()
export class HotelReservationController {
  constructor(
    private readonly hotelReservationService: HotelReservationService,
  ) {}

  @MessagePattern({ cmd: SubscriberPattern.CREATE_RESERVATION })
  async createReservation(
    @Payload() createReservationDto: CreateReservationDto,
  ): Promise<any> {
    return await this.hotelReservationService.createReservation(
      createReservationDto,
    );
  }

  @MessagePattern({ cmd: SubscriberPattern.RETRIEVE_RESERVATION })
  async retrieveReservation(@Payload() reservationId: string): Promise<any> {
    return await this.hotelReservationService.retrieveReservation(
      reservationId,
    );
  }
}
