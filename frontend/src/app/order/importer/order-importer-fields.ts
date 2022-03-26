import { OrderModel } from 'src/app/order/order-model';

const { fields } = OrderModel;

export default [
  fields.carId,
  fields.bookingAmount,
  fields.shippingAddress,
  fields.paymentMethod,
  fields.deliveryAddress,
  fields.pickupTime,
  fields.deliveryTime,
];
