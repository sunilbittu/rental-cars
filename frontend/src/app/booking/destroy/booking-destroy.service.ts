import { Injectable } from '@angular/core';
import { Snackbar } from 'src/app/shared/snackbar/snackbar.service';
import { ErrorService } from 'src/app/shared/error/error.service';
import { BookingApi } from 'src/app/booking/booking.api';
import { BookingListService } from 'src/app/booking/list/booking-list.service';
import { Router } from '@angular/router';
import { i18n } from 'src/i18n';

@Injectable({
  providedIn: 'root',
})
export class BookingDestroyService {
  loading = false;

  constructor(
    private errorService: ErrorService,
    private snackbar: Snackbar,
    private router: Router,
    private bookingListService: BookingListService,
  ) {}

  async doDestroy(id) {
    try {
      this.loading = true;
      await BookingApi.destroyAll([id]);
      this.loading = false;
      this.snackbar.success(
        i18n('entities.booking.destroy.success'),
      );

      this.router.navigate(['/booking']);

      await this.bookingListService.doFetch(
        this.bookingListService.filter,
      );
    } catch (error) {
      this.errorService.handle(error);
      this.loading = false;
    }
  }

  async doDestroyAll(ids) {
    try {
      this.loading = true;
      await BookingApi.destroyAll(ids);
      this.loading = false;

      this.bookingListService.doResetSelectedKeys();

      this.snackbar.success(
        i18n('entities.booking.destroyAll.success'),
      );

      this.router.navigate(['/booking']);

      return this.bookingListService.doFetch(
        this.bookingListService.filter,
      );
    } catch (error) {
      this.errorService.handle(error);
      this.loading = false;
    }
  }
}
