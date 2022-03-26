import { Component, OnInit } from '@angular/core';
import { i18n } from 'src/i18n';
import { CarListService } from 'src/app/car/list/car-list.service';
import { CarService } from 'src/app/car/car.service';
import { AuditLogService } from 'src/app/audit-log/audit-log.service';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';
import { CarDestroyService } from 'src/app/car/destroy/car-destroy.service';

@Component({
  selector: 'app-car-list-toolbar',
  templateUrl: './car-list-toolbar.component.html',
})
export class CarListToolbarComponent {
  constructor(
    public service: CarListService,
    private carService: CarService,
    private destroyService: CarDestroyService,
    private auditLogService: AuditLogService,
    private confirmService: ConfirmService,
  ) {}

  get destroyButtonDisabled() {
    return (
      this.service.selectedKeys.isEmpty() ||
      this.service.loading ||
      this.destroyService.loading
    );
  }

  get destroyButtonTooltip() {
    if (
      this.service.selectedKeys.isEmpty() ||
      this.service.loading
    ) {
      return i18n('common.mustSelectARow');
    }
  }

  async doDestroyAllSelected() {
    const result = await this.confirmService.confirm();

    if (!result) {
      return;
    }

    return this.destroyService.doDestroyAll(
      this.service.selectedKeys.selected,
    );
  }

  get hasPermissionToAuditLogs() {
    return this.auditLogService.hasPermissionToRead;
  }

  get hasPermissionToCreate() {
    return this.carService.hasPermissionToCreate;
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

  doExport() {
    return this.service.doExport();
  }

  get exportButtonDisabled() {
    return (
      !this.service.hasRows ||
      this.service.loading ||
      this.service.exportLoading
    );
  }

  get exportButtonTooltip() {
    if (!this.service.hasRows || this.service.loading) {
      return i18n('common.noDataToExport');
    }
  }
}
