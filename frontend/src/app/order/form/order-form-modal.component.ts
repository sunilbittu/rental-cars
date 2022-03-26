import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Snackbar } from 'src/app/shared/snackbar/snackbar.service';
import { ErrorService } from 'src/app/shared/error/error.service';
import { OrderApi } from 'src/app/order/order.api';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-order-form-modal',
  templateUrl: './order-form-modal.component.html',
})
export class OrderFormModalComponent {
  saveLoading = false;

  constructor(
    public dialogRef: MatDialogRef<
      OrderFormModalComponent
    >,
    private errorService: ErrorService,
    private snackbar: Snackbar,
  ) {}

  async doCreate({ id, values }) {
    try {
      this.saveLoading = true;
      const { id } = await OrderApi.create(values);
      const record = await OrderApi.find(id);
      this.saveLoading = false;

      this.snackbar.success(
        i18n('entities.order.create.success'),
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
