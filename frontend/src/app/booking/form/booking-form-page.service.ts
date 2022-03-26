import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BookingApi } from 'src/app/booking/booking.api';
import { ErrorService } from 'src/app/shared/error/error.service';
import { Snackbar } from 'src/app/shared/snackbar/snackbar.service';
import { i18n } from 'src/i18n';

@Injectable({
  providedIn: 'root',
})
export class BookingFormPageService {
  initLoading = false;
  saveLoading = false;
  record = null;

  constructor(
    private errorService: ErrorService,
    private snackbar: Snackbar,
    private router: Router,
  ) {}

  async doInit(id) {
    try {
      this.record = null;
      this.initLoading = true;

      if (id) {
        this.record = await BookingApi.find(id);
      }

      this.initLoading = false;
    } catch (error) {
      this.errorService.handle(error);
      this.record = null;
      this.initLoading = true;
      this.router.navigate(['/booking']);
    }
  }

  async doCreate(values) {
    try {
      this.saveLoading = true;
      await BookingApi.create(values);
      this.saveLoading = false;

      this.snackbar.success(
        i18n('entities.booking.create.success'),
      );

      this.router.navigate(['/booking']);
    } catch (error) {
      this.errorService.handle(error);
      this.saveLoading = false;
    }
  }

  async doUpdate(id, values) {
    try {
      this.saveLoading = true;
      await BookingApi.update(id, values);
      this.saveLoading = false;

      this.snackbar.success(
        i18n('entities.booking.update.success'),
      );

      this.router.navigate(['/booking']);
    } catch (error) {
      this.errorService.handle(error);
      this.saveLoading = false;
    }
  }
}
