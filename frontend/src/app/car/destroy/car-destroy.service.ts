import { Injectable } from '@angular/core';
import { Snackbar } from 'src/app/shared/snackbar/snackbar.service';
import { ErrorService } from 'src/app/shared/error/error.service';
import { CarApi } from 'src/app/car/car.api';
import { CarListService } from 'src/app/car/list/car-list.service';
import { Router } from '@angular/router';
import { i18n } from 'src/i18n';

@Injectable({
  providedIn: 'root',
})
export class CarDestroyService {
  loading = false;

  constructor(
    private errorService: ErrorService,
    private snackbar: Snackbar,
    private router: Router,
    private carListService: CarListService,
  ) {}

  async doDestroy(id) {
    try {
      this.loading = true;
      await CarApi.destroyAll([id]);
      this.loading = false;
      this.snackbar.success(
        i18n('entities.car.destroy.success'),
      );

      this.router.navigate(['/car']);

      await this.carListService.doFetch(
        this.carListService.filter,
      );
    } catch (error) {
      this.errorService.handle(error);
      this.loading = false;
    }
  }

  async doDestroyAll(ids) {
    try {
      this.loading = true;
      await CarApi.destroyAll(ids);
      this.loading = false;

      this.carListService.doResetSelectedKeys();

      this.snackbar.success(
        i18n('entities.car.destroyAll.success'),
      );

      this.router.navigate(['/car']);

      return this.carListService.doFetch(
        this.carListService.filter,
      );
    } catch (error) {
      this.errorService.handle(error);
      this.loading = false;
    }
  }
}
