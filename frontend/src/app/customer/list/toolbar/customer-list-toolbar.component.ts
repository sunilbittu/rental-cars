import { Component, OnInit } from '@angular/core';
import { i18n } from 'src/i18n';
import { CustomerListService } from 'src/app/customer/list/customer-list.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { AuditLogService } from 'src/app/audit-log/audit-log.service';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';
import { CustomerDestroyService } from 'src/app/customer/destroy/customer-destroy.service';

@Component({
  selector: 'app-customer-list-toolbar',
  templateUrl: './customer-list-toolbar.component.html',
})
export class CustomerListToolbarComponent {
  constructor(
    public service: CustomerListService,
    private customerService: CustomerService,
    private destroyService: CustomerDestroyService,
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
    return this.customerService.hasPermissionToCreate;
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
