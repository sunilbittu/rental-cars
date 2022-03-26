import { GenericModel } from 'src/app/shared/model/generic-model';
import { i18n } from 'src/i18n';
import DateTimeField from 'src/app/shared/fields/date-time-field';
import IdField from 'src/app/shared/fields/id-field';
import DateTimeRangeField from 'src/app/shared/fields/date-time-range-field';
import IntegerField from 'src/app/shared/fields/integer-field';
import IntegerRangeField from 'src/app/shared/fields/integer-range-field';
import StringField from 'src/app/shared/fields/string-field';
import EnumeratorMultipleField from 'src/app/shared/fields/enumerator-multiple-field';
import DecimalRangeField from 'src/app/shared/fields/decimal-range-field';
import DecimalField from 'src/app/shared/fields/decimal-field';
import { Storage } from 'src/security/storage';
import ImagesField from 'src/app/shared/fields/images-field';

function label(name) {
  return i18n(`entities.car.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.car.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  name: new StringField('name', label('name'), {}),
  image: new ImagesField('image', label('image'),Storage.values.carImage, {}),
  seats: new IntegerField('seats', label('seats'), {}),
  carType: new EnumeratorMultipleField('carType', label('carType'), [
    { id: 'Sedan', label: enumeratorLabel('carType', 'Sedan') },
    { id: 'Hatchback', label: enumeratorLabel('carType', 'Hatchback') },
    { id: 'XUV', label: enumeratorLabel('carType', 'XUV') },
  ],{}),
  transmission: new EnumeratorMultipleField('transmission', label('transmission'), [
    { id: 'Manual', label: enumeratorLabel('transmission', 'Manual') },
    { id: 'Automatic', label: enumeratorLabel('transmission', 'Automatic') },
  ],{}),
  deliveryType: new EnumeratorMultipleField('deliveryType', label('deliveryType'), [
    { id: 'Home', label: enumeratorLabel('deliveryType', 'Home') },
    { id: 'Self Pickup', label: enumeratorLabel('deliveryType', 'Self Pickup') },
  ],{}),
  note: new StringField('note', label('note'), {}),
  brand: new StringField('brand', label('brand'), {}),
  price: new DecimalField('price', label('price'), {}),
  countInStock: new IntegerField('countInStock', label('countInStock'), {}),
  rating: new DecimalField('rating', label('rating'), {}),
  numReviews: new IntegerField('numReviews', label('numReviews'), {}),
  fuelType: new EnumeratorMultipleField('fuelType', label('fuelType'), [
    { id: 'Petrol', label: enumeratorLabel('fuelType', 'Petrol') },
    { id: 'Diesel', label: enumeratorLabel('fuelType', 'Diesel') },
    { id: 'Electric', label: enumeratorLabel('fuelType', 'Electric') },
  ],{}),
  locations: new EnumeratorMultipleField('locations', label('locations'), [
    { id: 'Location1', label: enumeratorLabel('locations', 'Location1') },
    { id: 'Location2', label: enumeratorLabel('locations', 'Location2') },
    { id: 'Location3', label: enumeratorLabel('locations', 'Location3') },
  ],{}),
  freeKms: new IntegerField('freeKms', label('freeKms'), {}),
  deliveryCharges: new DecimalField('deliveryCharges', label('deliveryCharges'), {}),
  bookedTimeSlotsFrom: new DateTimeField('bookedTimeSlotsFrom', label('bookedTimeSlotsFrom'), {}),
  bookedTimeSlotsTo: new DateTimeField('bookedTimeSlotsTo', label('bookedTimeSlotsTo'), {}),
  rentPerHour: new DecimalField('rentPerHour', label('rentPerHour'), {}),
  capacity: new IntegerField('capacity', label('capacity'), {}),
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
  seatsRange: new IntegerRangeField(
    'seatsRange',
    label('seatsRange'),
  ),
  priceRange: new DecimalRangeField(
    'priceRange',
    label('priceRange'),
  ),
  countInStockRange: new IntegerRangeField(
    'countInStockRange',
    label('countInStockRange'),
  ),
  ratingRange: new DecimalRangeField(
    'ratingRange',
    label('ratingRange'),
  ),
  numReviewsRange: new IntegerRangeField(
    'numReviewsRange',
    label('numReviewsRange'),
  ),
  freeKmsRange: new IntegerRangeField(
    'freeKmsRange',
    label('freeKmsRange'),
  ),
  deliveryChargesRange: new DecimalRangeField(
    'deliveryChargesRange',
    label('deliveryChargesRange'),
  ),
  bookedTimeSlotsFromRange: new DateTimeRangeField(
    'bookedTimeSlotsFromRange',
    label('bookedTimeSlotsFromRange'),
  ),
  bookedTimeSlotsToRange: new DateTimeRangeField(
    'bookedTimeSlotsToRange',
    label('bookedTimeSlotsToRange'),
  ),
  rentPerHourRange: new DecimalRangeField(
    'rentPerHourRange',
    label('rentPerHourRange'),
  ),
  capacityRange: new IntegerRangeField(
    'capacityRange',
    label('capacityRange'),
  ),
};

export class CarModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
