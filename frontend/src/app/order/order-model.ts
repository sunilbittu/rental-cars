import { GenericModel } from 'src/app/shared/model/generic-model';
import { i18n } from 'src/i18n';
import DateTimeField from 'src/app/shared/fields/date-time-field';
import IdField from 'src/app/shared/fields/id-field';
import DateTimeRangeField from 'src/app/shared/fields/date-time-range-field';
import StringField from 'src/app/shared/fields/string-field';
import EnumeratorMultipleField from 'src/app/shared/fields/enumerator-multiple-field';
import DecimalRangeField from 'src/app/shared/fields/decimal-range-field';
import DecimalField from 'src/app/shared/fields/decimal-field';

function label(name) {
  return i18n(`entities.order.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.order.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  carId: new StringField('carId', label('carId'), {}),
  bookingAmount: new DecimalField('bookingAmount', label('bookingAmount'), {}),
  shippingAddress: new StringField('shippingAddress', label('shippingAddress'), {}),
  paymentMethod: new EnumeratorMultipleField('paymentMethod', label('paymentMethod'), [
    { id: 'Cash', label: enumeratorLabel('paymentMethod', 'Cash') },
    { id: 'Card', label: enumeratorLabel('paymentMethod', 'Card') },
  ],{}),
  deliveryAddress: new StringField('deliveryAddress', label('deliveryAddress'), {}),
  pickupTime: new DateTimeField('pickupTime', label('pickupTime'), {}),
  deliveryTime: new DateTimeField('deliveryTime', label('deliveryTime'), {}),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
  bookingAmountRange: new DecimalRangeField(
    'bookingAmountRange',
    label('bookingAmountRange'),
  ),
  pickupTimeRange: new DateTimeRangeField(
    'pickupTimeRange',
    label('pickupTimeRange'),
  ),
  deliveryTimeRange: new DateTimeRangeField(
    'deliveryTimeRange',
    label('deliveryTimeRange'),
  ),
};

export class OrderModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
