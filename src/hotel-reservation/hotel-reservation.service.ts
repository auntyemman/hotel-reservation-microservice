import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorResponse } from '../common/interface/error-response.interface';
import { RpcException } from '@nestjs/microservices';
import { CreateReservationDto } from './dto/reservation.dto';
import { HotelReservationRepository } from './hotel-reservation.repository';

@Injectable()
export class HotelReservationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly hotelReservationRepository: HotelReservationRepository,
  ) {}

  private readonly ISE: string = 'Internal Server Error';

  /**
   * @Responsibility: hotel reservation service method to create a new hotel reservation
   *
   * @param createReservationDto
   * @returns {Promise<any>}
   */

  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<any> {
    try {
      const theReservation =
        await this.hotelReservationRepository.findHotelReservation({
          guestId: createReservationDto?.guestId,
          hotelId: createReservationDto?.hotelId,
        });
      if (theReservation) {
        throw new RpcException(
          this.errR({
            message: 'Reservation already exists for this hotel',
            status: HttpStatus.CONFLICT,
          }),
        );
      }
      return await this.hotelReservationRepository.createHotelReservation(
        createReservationDto,
      );
    } catch (error) {
      throw new RpcException(
        this.errR({
          message: error?.message ? error.message : this.ISE,
          status: error?.error?.status,
        }),
      );
    }
  }

  /**
   * @Responsibility: hotel reservation service method to retrieve a single hotel reservation
   *
   * @param reservationId
   * @returns {Promise<any>}
   */

  async retrieveReservation(reservationId: string): Promise<any> {
    try {
      const theReservation =
        await this.hotelReservationRepository.findHotelReservation({
          _id: reservationId,
        });
      if (!theReservation) {
        throw new RpcException(
          this.errR({
            message: 'reservation not found',
            status: HttpStatus.NOT_FOUND,
          }),
        );
      }

      return theReservation;
    } catch (error) {
      throw new RpcException(
        this.errR({
          message: error?.message ? error.message : this.ISE,
          status: error?.error?.status,
        }),
      );
    }
  }

  private errR(errorInput: { message: string; status: number }): ErrorResponse {
    return {
      message: errorInput.message,
      status: errorInput.status,
    };
  }
}
