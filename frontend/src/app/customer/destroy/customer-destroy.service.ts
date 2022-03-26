import { Injectable } from '@angular/core';
import { Snackbar } from 'src/app/shared/snackbar/snackbar.service';
import { ErrorService } from 'src/app/shared/error/error.service';
import { CustomerApi } from 'src/app/customer/customer.api';
import { CustomerListService } from 'src/app/customer/list/customer-list.service';
import { Router } from '@angular/router';
import { i18n } from 'src/i18n';

@Injectable({
  providedIn: 'root',
})
export class CustomerDestroyService {
  loading = false;

  constructor(
    private errorService: ErrorService,
    private snackbar: Snackbar,
    private router: Router,
    private customerListService: CustomerListService,
  ) {}

  async doDestroy(id) {
    try {
      this.loading = true;
      await CustomerApi.destroyAll([id]);
      this.loading = false;
      this.snackbar.success(
        i18n('entities.customer.destroy.success'),
      );

      this.router.navigate(['/customer']);

      await this.customerListService.doFetch(
        this.customerListService.filter,
      );
    } catch (error) {
      this.errorService.handle(error);
      this.loading = false;
    }
  }

  async doDestroyAll(ids) {
    try {
      this.loading = true;
      await CustomerApi.destroyAll(ids);
      this.loading = false;

      this.customerListService.doResetSelectedKeys();

      this.snackbar.success(
        i18n('entities.customer.destroyAll.success'),
      );

      this.router.navigate(['/customer']);

      return this.customerListService.doFetch(
        this.customerListService.filter,
      );
    } catch (error) {
      this.errorService.handle(error);
      this.loading = false;
    }
  }
}
