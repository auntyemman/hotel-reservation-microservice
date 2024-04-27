import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment';
import { Moment } from 'moment';

export type HotelReservationDocument = HotelReservation & Document;

@Schema()
export class HotelReservation {
  @Prop({ type: String, required: true })
  guestId: string;

  @Prop({ type: String, required: true })
  hotelId: string;

  @Prop({ type: Date, required: true })
  checkInDate: Date;

  @Prop({ type: Date, required: true })
  checkOutDate: Date;

  @Prop({ type: String, required: true })
  roomType: string;

  @Prop({ type: String, required: true })
  roomNumber: string;

  @Prop({ default: () => moment().utc().toDate(), type: Date })
  createdAt: Moment;
}

export const HotelReservationSchema =
  SchemaFactory.createForClass(HotelReservation);
