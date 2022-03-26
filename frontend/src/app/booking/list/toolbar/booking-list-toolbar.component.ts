import { Component, OnInit } from '@angular/core';
import { i18n } from 'src/i18n';
import { BookingListService } from 'src/app/booking/list/booking-list.service';
import { BookingService } from 'src/app/booking/booking.service';
import { AuditLogService } from 'src/app/audit-log/audit-log.service';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';
import { BookingDestroyService } from 'src/app/booking/destroy/booking-destroy.service';

@Component({
  selector: 'app-booking-list-toolbar',
  templateUrl: './booking-list-toolbar.component.html',
})
export class BookingListToolbarComponent {
  constructor(
    public service: BookingListService,
    private bookingService: BookingService,
    private destroyService: BookingDestroyService,
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
    return this.bookingService.hasPermissionToCreate;
  }

  get hasPermissionToDestroy() {
    return this.bookingService.hasPermissionToDestroy;
  }

  get hasPermissionToEdit() {
    return this.bookingService.hasPermissionToEdit;
  }

  get hasPermissionToImport() {
    return this.bookingService.hasPermissionToImport;
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
