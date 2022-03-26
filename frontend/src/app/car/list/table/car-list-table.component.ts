import { Component } from '@angular/core';
import { CarListService } from 'src/app/car/list/car-list.service';
import { CarService } from 'src/app/car/car.service';
import { CarModel } from 'src/app/car/car-model';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';
import { CarDestroyService } from 'src/app/car/destroy/car-destroy.service';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-car-list-table',
  templateUrl: './car-list-table.component.html',
})
export class CarListTableComponent {
  constructor(
    public service: CarListService,
    public destroyService: CarDestroyService,
    public carService: CarService,
    private confirmService: ConfirmService,
  ) {}

  presenter(row, fieldName) {
    return CarModel.presenter(row, fieldName);
  }

  i18n(key) {
    return i18n(key);
  }

  async doDestroy(id) {
    const response = await this.confirmService.confirm();

    if (!response) {
      return;
    }

    return this.destroyService.doDestroy(id);
  }

  get hasPermissionToEdit() {
    return this.carService.hasPermissionToEdit;
  }

  get hasPermissionToDestroy() {
    return this.carService.hasPermissionToDestroy;
  }

  get fields() {
    return CarModel.fields;
  }

  get columns() {
    return [
      '_select',

      this.fields.name.name,
      this.fields.image.name,
      this.fields.seats.name,
      this.fields.carType.name,
      this.fields.transmission.name,
      this.fields.deliveryType.name,
      this.fields.note.name,
      this.fields.brand.name,
      this.fields.price.name,
      this.fields.countInStock.name,
      this.fields.rating.name,
      this.fields.numReviews.name,
      this.fields.fuelType.name,
      this.fields.locations.name,
      this.fields.freeKms.name,
      this.fields.deliveryCharges.name,
      this.fields.bookedTimeSlotsFrom.name,
      this.fields.bookedTimeSlotsTo.name,
      this.fields.rentPerHour.name,
      this.fields.capacity.name,

      '_actions',
    ];
  }
}
