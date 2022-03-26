import { BookingModel } from 'src/app/booking/booking-model';

const { fields } = BookingModel;

export default [
  fields.car,
  fields.bookedTimeSlotsFrom,
  fields.bookedTimeSlotsTo,
  fields.totalHours,
  fields.totalAmount,
  fields.transactionId,
];
