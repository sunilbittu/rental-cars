import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Snackbar } from 'src/app/shared/snackbar/snackbar.service';
import { ErrorService } from 'src/app/shared/error/error.service';
import { CarApi } from 'src/app/car/car.api';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-car-form-modal',
  templateUrl: './car-form-modal.component.html',
})
export class CarFormModalComponent {
  saveLoading = false;

  constructor(
    public dialogRef: MatDialogRef<
      CarFormModalComponent
    >,
    private errorService: ErrorService,
    private snackbar: Snackbar,
  ) {}

  async doCreate({ id, values }) {
    try {
      this.saveLoading = true;
      const { id } = await CarApi.create(values);
      const record = await CarApi.find(id);
      this.saveLoading = false;

      this.snackbar.success(
        i18n('entities.car.create.success'),
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
