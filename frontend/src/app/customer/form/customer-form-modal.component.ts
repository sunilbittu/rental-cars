import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Snackbar } from 'src/app/shared/snackbar/snackbar.service';
import { ErrorService } from 'src/app/shared/error/error.service';
import { CustomerApi } from 'src/app/customer/customer.api';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-customer-form-modal',
  templateUrl: './customer-form-modal.component.html',
})
export class CustomerFormModalComponent {
  saveLoading = false;

  constructor(
    public dialogRef: MatDialogRef<
      CustomerFormModalComponent
    >,
    private errorService: ErrorService,
    private snackbar: Snackbar,
  ) {}

  async doCreate({ id, values }) {
    try {
      this.saveLoading = true;
      const { id } = await CustomerApi.create(values);
      const record = await CustomerApi.find(id);
      this.saveLoading = false;

      this.snackbar.success(
        i18n('entities.customer.create.success'),
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
