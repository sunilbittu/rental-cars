import { GenericModel } from 'src/app/shared/model/generic-model';
import { i18n } from 'src/i18n';
import DateTimeField from 'src/app/shared/fields/date-time-field';
import IdField from 'src/app/shared/fields/id-field';
import DateTimeRangeField from 'src/app/shared/fields/date-time-range-field';
import IntegerField from 'src/app/shared/fields/integer-field';
import IntegerRangeField from 'src/app/shared/fields/integer-range-field';
import StringField from 'src/app/shared/fields/string-field';
import DecimalRangeField from 'src/app/shared/fields/decimal-range-field';
import DecimalField from 'src/app/shared/fields/decimal-field';

function label(name) {
  return i18n(`entities.booking.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  car: new StringField('car', label('car'), {}),
  bookedTimeSlotsFrom: new DateTimeField('bookedTimeSlotsFrom', label('bookedTimeSlotsFrom'), {}),
  bookedTimeSlotsTo: new DateTimeField('bookedTimeSlotsTo', label('bookedTimeSlotsTo'), {}),
  totalHours: new IntegerField('totalHours', label('totalHours'), {}),
  totalAmount: new DecimalField('totalAmount', label('totalAmount'), {}),
  transactionId: new StringField('transactionId', label('transactionId'), {}),
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
  bookedTimeSlotsFromRange: new DateTimeRangeField(
    'bookedTimeSlotsFromRange',
    label('bookedTimeSlotsFromRange'),
  ),
  bookedTimeSlotsToRange: new DateTimeRangeField(
    'bookedTimeSlotsToRange',
    label('bookedTimeSlotsToRange'),
  ),
  totalHoursRange: new IntegerRangeField(
    'totalHoursRange',
    label('totalHoursRange'),
  ),
  totalAmountRange: new DecimalRangeField(
    'totalAmountRange',
    label('totalAmountRange'),
  ),
};

export class BookingModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
