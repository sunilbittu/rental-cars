import { Component, Input } from '@angular/core';
import { CustomerFormModalService } from 'src/app/customer/form/customer-form-modal.service';
import { CustomerService } from 'src/app/customer/customer.service';

@Component({
  selector: 'app-customer-form-field',
  templateUrl: './customer-form-field.component.html',
})
export class CustomerFormFieldComponent {
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
    public service: CustomerFormModalService,
    public customerService: CustomerService,
  ) {}

  public get hasPermissionToCreate() {
    return this.customerService.hasPermissionToCreate;
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
