import { Component, OnInit } from '@angular/core';
import { i18n } from 'src/i18n';
import { CarViewService } from 'src/app/car/view/car-view.service';
import { CarService } from 'src/app/car/car.service';
import { AuditLogService } from 'src/app/audit-log/audit-log.service';
import { CarDestroyService } from 'src/app/car/destroy/car-destroy.service';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';

@Component({
  selector: 'app-car-view-toolbar',
  templateUrl: './car-view-toolbar.component.html',
})
export class CarViewToolbarComponent {
  constructor(
    public service: CarViewService,
    private carService: CarService,
    private destroyService: CarDestroyService,
    private auditLogService: AuditLogService,
    private confirmService: ConfirmService,
  ) {}

  async doDestroy() {
    const result = await this.confirmService.confirm();

    if (!result) {
      return;
    }

    return this.destroyService.doDestroy(this.record.id);
  }

  get destroyLoading() {
    return this.destroyService.loading;
  }

  get hasPermissionToDestroy() {
    return this.carService.hasPermissionToDestroy;
  }

  get hasPermissionToEdit() {
    return this.carService.hasPermissionToEdit;
  }

  get hasPermissionToImport() {
    return this.carService.hasPermissionToImport;
  }

  get hasPermissionToAuditLogs() {
    return this.auditLogService.hasPermissionToRead;
  }

  get record() {
    return this.service.record;
  }
}
