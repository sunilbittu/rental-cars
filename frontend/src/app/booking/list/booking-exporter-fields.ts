import { BookingModel } from 'src/app/booking/booking-model';

const { fields } = BookingModel;

export default [
  fields.id,
  fields.car,
  fields.bookedTimeSlotsFrom,
  fields.bookedTimeSlotsTo,
  fields.totalHours,
  fields.totalAmount,
  fields.transactionId,
  fields.createdAt,
  fields.updatedAt,
];
