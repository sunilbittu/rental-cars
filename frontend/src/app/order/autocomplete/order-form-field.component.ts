import { Component, Input } from '@angular/core';
import { OrderFormModalService } from 'src/app/order/form/order-form-modal.service';
import { OrderService } from 'src/app/order/order.service';

@Component({
  selector: 'app-order-form-field',
  templateUrl: './order-form-field.component.html',
})
export class OrderFormFieldComponent {
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
    public service: OrderFormModalService,
    public orderService: OrderService,
  ) {}

  public get hasPermissionToCreate() {
    return this.orderService.hasPermissionToCreate;
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
