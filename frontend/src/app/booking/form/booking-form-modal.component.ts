import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Snackbar } from 'src/app/shared/snackbar/snackbar.service';
import { ErrorService } from 'src/app/shared/error/error.service';
import { BookingApi } from 'src/app/booking/booking.api';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-booking-form-modal',
  templateUrl: './booking-form-modal.component.html',
})
export class BookingFormModalComponent {
  saveLoading = false;

  constructor(
    public dialogRef: MatDialogRef<
      BookingFormModalComponent
    >,
    private errorService: ErrorService,
    private snackbar: Snackbar,
  ) {}

  async doCreate({ id, values }) {
    try {
      this.saveLoading = true;
      const { id } = await BookingApi.create(values);
      const record = await BookingApi.find(id);
      this.saveLoading = false;

      this.snackbar.success(
        i18n('entities.booking.create.success'),
      );

      if (this.dialogRef) {
        this.dialogRef.close(record);
      }
    } catch (error) {
      this.errorService.handle(error);
      this.saveLoading = false;
    }
  }

  doCancel() {
    this.dialogRef.close();
  }
}
