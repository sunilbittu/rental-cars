import RelationToOneField from 'src/app/shared/fields/relation-to-one-field';
import { BookingApi } from 'src/app/booking/booking.api';
import { Permissions } from 'src/security/permissions';
import RelationToManyField from 'src/app/shared/fields/relation-to-many-field';

export class BookingField {
  static relationToOne(name, label, options?) {
    return new RelationToOneField(
      name,
      label,
      '/booking',
      Permissions.values.bookingRead,
      BookingApi.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.id,
        };
      },
      options,
    );
  }

  static relationToMany(name, label, options?) {
    return new RelationToManyField(
      name,
      label,
      '/booking',
      Permissions.values.bookingRead,
      BookingApi.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.id,
        };
      },
      options,
    );
  }
}
