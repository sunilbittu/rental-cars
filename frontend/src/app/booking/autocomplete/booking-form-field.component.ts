import { Component, Input } from '@angular/core';
import { BookingFormModalService } from 'src/app/booking/form/booking-form-modal.service';
import { BookingService } from 'src/app/booking/booking.service';

@Component({
  selector: 'app-booking-form-field',
  templateUrl: './booking-form-field.component.html',
})
export class BookingFormFieldComponent {
  @Input() mode = 'single';
  @Input() submitted = false;
  @Input() control;
  @Input() label;
  @Input() required = false;
  @Input() appAutofocus = false;
  @Input() serverSideSearch = false;
  @Input() fetchFn = null;
  @Input() mapperFn = null;
  @Input()
  ngForm: any;
  @Input() showCreate = false;
  @Input() hint;
  @Input() placeholder;

  constructor(
    public service: BookingFormModalService,
    public bookingService: BookingService,
  ) {}

  public get hasPermissionToCreate() {
    return this.bookingService.hasPermissionToCreate;
  }

  public async createModalOpen() {
    const record = await this.service.open();
    if (record) {
      if (this.mode === 'multiple') {
        this.control.setValue([
          ...(this.control.value || []),
          this.mapperFn(record),
        ]);
      } else {
        this.control.setValue(this.mapperFn(record));
      }
    }
  }
}
