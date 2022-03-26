import { Component, OnInit } from '@angular/core';
import { i18n } from 'src/i18n';
import { BookingViewService } from 'src/app/booking/view/booking-view.service';
import { BookingService } from 'src/app/booking/booking.service';
import { AuditLogService } from 'src/app/audit-log/audit-log.service';
import { BookingDestroyService } from 'src/app/booking/destroy/booking-destroy.service';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';

@Component({
  selector: 'app-booking-view-toolbar',
  templateUrl: './booking-view-toolbar.component.html',
})
export class BookingViewToolbarComponent {
  constructor(
    public service: BookingViewService,
    private bookingService: BookingService,
    private destroyService: BookingDestroyService,
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
    return this.bookingService.hasPermissionToDestroy;
  }

  get hasPermissionToEdit() {
    return this.bookingService.hasPermissionToEdit;
  }

  get hasPermissionToImport() {
    return this.bookingService.hasPermissionToImport;
  }

  get hasPermissionToAuditLogs() {
    return this.auditLogService.hasPermissionToRead;
  }

  get record() {
    return this.service.record;
  }
}
