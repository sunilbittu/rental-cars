import { Injectable } from '@angular/core';
import { Snackbar } from 'src/app/shared/snackbar/snackbar.service';
import { ErrorService } from 'src/app/shared/error/error.service';
import { OrderApi } from 'src/app/order/order.api';
import { OrderListService } from 'src/app/order/list/order-list.service';
import { Router } from '@angular/router';
import { i18n } from 'src/i18n';

@Injectable({
  providedIn: 'root',
})
export class OrderDestroyService {
  loading = false;

  constructor(
    private errorService: ErrorService,
    private snackbar: Snackbar,
    private router: Router,
    private orderListService: OrderListService,
  ) {}

  async doDestroy(id) {
    try {
      this.loading = true;
      await OrderApi.destroyAll([id]);
      this.loading = false;
      this.snackbar.success(
        i18n('entities.order.destroy.success'),
      );

      this.router.navigate(['/order']);

      await this.orderListService.doFetch(
        this.orderListService.filter,
      );
    } catch (error) {
      this.errorService.handle(error);
      this.loading = false;
    }
  }

  async doDestroyAll(ids) {
    try {
      this.loading = true;
      await OrderApi.destroyAll(ids);
      this.loading = false;

      this.orderListService.doResetSelectedKeys();

      this.snackbar.success(
        i18n('entities.order.destroyAll.success'),
      );

      this.router.navigate(['/order']);

      return this.orderListService.doFetch(
        this.orderListService.filter,
      );
    } catch (error) {
      this.errorService.handle(error);
      this.loading = false;
    }
  }
}
