import { Test, TestingModule } from '@nestjs/testing';
import { HotelReservationService } from './hotel-reservation.service';

describe('HotelReservationService', () => {
  let service: HotelReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelReservationService],
    }).compile();

    service = module.get<HotelReservationService>(HotelReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
