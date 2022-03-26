import { Component } from '@angular/core';
import { BookingListService } from 'src/app/booking/list/booking-list.service';
import { BookingService } from 'src/app/booking/booking.service';
import { BookingModel } from 'src/app/booking/booking-model';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';
import { BookingDestroyService } from 'src/app/booking/destroy/booking-destroy.service';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-booking-list-table',
  templateUrl: './booking-list-table.component.html',
})
export class BookingListTableComponent {
  constructor(
    public service: BookingListService,
    public destroyService: BookingDestroyService,
    public bookingService: BookingService,
    private confirmService: ConfirmService,
  ) {}

  presenter(row, fieldName) {
    return BookingModel.presenter(row, fieldName);
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
    return this.bookingService.hasPermissionToEdit;
  }

  get hasPermissionToDestroy() {
    return this.bookingService.hasPermissionToDestroy;
  }

  get fields() {
    return BookingModel.fields;
  }

  get columns() {
    return [
      '_select',

      this.fields.car.name,
      this.fields.bookedTimeSlotsFrom.name,
      this.fields.bookedTimeSlotsTo.name,
      this.fields.totalHours.name,
      this.fields.totalAmount.name,
      this.fields.transactionId.name,

      '_actions',
    ];
  }
}
