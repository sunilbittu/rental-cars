import { Component, OnInit } from '@angular/core';
import { i18n } from 'src/i18n';
import { OrderViewService } from 'src/app/order/view/order-view.service';
import { OrderService } from 'src/app/order/order.service';
import { AuditLogService } from 'src/app/audit-log/audit-log.service';
import { OrderDestroyService } from 'src/app/order/destroy/order-destroy.service';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';

@Component({
  selector: 'app-order-view-toolbar',
  templateUrl: './order-view-toolbar.component.html',
})
export class OrderViewToolbarComponent {
  constructor(
    public service: OrderViewService,
    private orderService: OrderService,
    private destroyService: OrderDestroyService,
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
    return this.orderService.hasPermissionToDestroy;
  }

  get hasPermissionToEdit() {
    return this.orderService.hasPermissionToEdit;
  }

  get hasPermissionToImport() {
    return this.orderService.hasPermissionToImport;
  }

  get hasPermissionToAuditLogs() {
    return this.auditLogService.hasPermissionToRead;
  }

  get record() {
    return this.service.record;
  }
}
