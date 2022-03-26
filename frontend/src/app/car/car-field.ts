import RelationToOneField from 'src/app/shared/fields/relation-to-one-field';
import { CarApi } from 'src/app/car/car.api';
import { Permissions } from 'src/security/permissions';
import RelationToManyField from 'src/app/shared/fields/relation-to-many-field';

export class CarField {
  static relationToOne(name, label, options?) {
    return new RelationToOneField(
      name,
      label,
      '/car',
      Permissions.values.carRead,
      CarApi.listAutocomplete,
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
      '/car',
      Permissions.values.carRead,
      CarApi.listAutocomplete,
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
