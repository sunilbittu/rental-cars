import { GenericModel } from 'src/app/shared/model/generic-model';
import { i18n } from 'src/i18n';
import DateTimeField from 'src/app/shared/fields/date-time-field';
import IdField from 'src/app/shared/fields/id-field';
import DateTimeRangeField from 'src/app/shared/fields/date-time-range-field';
import StringField from 'src/app/shared/fields/string-field';
import EnumeratorMultipleField from 'src/app/shared/fields/enumerator-multiple-field';
import BooleanField from 'src/app/shared/fields/boolean-field';

function label(name) {
  return i18n(`entities.customer.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.customer.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  name: new StringField('name', label('name'), {}),
  email: new StringField('email', label('email'), {}),
  password: new StringField('password', label('password'), {}),
  phone: new StringField('phone', label('phone'), {}),
  gender: new EnumeratorMultipleField('gender', label('gender'), [
    { id: 'Male', label: enumeratorLabel('gender', 'Male') },
    { id: 'Female', label: enumeratorLabel('gender', 'Female') },
  ],{}),
  location: new StringField('location', label('location'), {}),
  isAdmin: new BooleanField('isAdmin', label('isAdmin'), {}),
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

};

export class CustomerModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
