import { Test, TestingModule } from '@nestjs/testing';
import { HotelReservationController } from './hotel-reservation.controller';
import { HotelReservationService } from './hotel-reservation.service';

describe('HotelReservationController', () => {
  let controller: HotelReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelReservationController],
      providers: [HotelReservationService],
    }).compile();

    controller = module.get<HotelReservationController>(
      HotelReservationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
