import { Component, OnInit } from '@angular/core';
import { i18n } from 'src/i18n';
import { CustomerViewService } from 'src/app/customer/view/customer-view.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { AuditLogService } from 'src/app/audit-log/audit-log.service';
import { CustomerDestroyService } from 'src/app/customer/destroy/customer-destroy.service';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';

@Component({
  selector: 'app-customer-view-toolbar',
  templateUrl: './customer-view-toolbar.component.html',
})
export class CustomerViewToolbarComponent {
  constructor(
    public service: CustomerViewService,
    private customerService: CustomerService,
    private destroyService: CustomerDestroyService,
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
    return this.customerService.hasPermissionToDestroy;
  }

  get hasPermissionToEdit() {
    return this.customerService.hasPermissionToEdit;
  }

  get hasPermissionToImport() {
    return this.customerService.hasPermissionToImport;
  }

  get hasPermissionToAuditLogs() {
    return this.auditLogService.hasPermissionToRead;
  }

  get record() {
    return this.service.record;
  }
}
