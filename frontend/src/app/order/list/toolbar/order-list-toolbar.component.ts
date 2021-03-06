import { Component, OnInit } from '@angular/core';
import { i18n } from 'src/i18n';
import { OrderListService } from 'src/app/order/list/order-list.service';
import { OrderService } from 'src/app/order/order.service';
import { AuditLogService } from 'src/app/audit-log/audit-log.service';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';
import { OrderDestroyService } from 'src/app/order/destroy/order-destroy.service';

@Component({
  selector: 'app-order-list-toolbar',
  templateUrl: './order-list-toolbar.component.html',
})
export class OrderListToolbarComponent {
  constructor(
    public service: OrderListService,
    private orderService: OrderService,
    private destroyService: OrderDestroyService,
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
    return this.orderService.hasPermissionToCreate;
  }

  get hasPermissionToDestroy() {
    return this.orderService.hasPermissionToDestroy;
  }

  get hasPermissionToEdit() {
    return this.orderService.hasPermissionToEdit;
  }

  get hasPermissionToImport() {
    return this.orderService.hasPermissionToImport;
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
