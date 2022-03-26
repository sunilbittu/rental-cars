import { Component } from '@angular/core';
import { OrderListService } from 'src/app/order/list/order-list.service';
import { OrderService } from 'src/app/order/order.service';
import { OrderModel } from 'src/app/order/order-model';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';
import { OrderDestroyService } from 'src/app/order/destroy/order-destroy.service';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-order-list-table',
  templateUrl: './order-list-table.component.html',
})
export class OrderListTableComponent {
  constructor(
    public service: OrderListService,
    public destroyService: OrderDestroyService,
    public orderService: OrderService,
    private confirmService: ConfirmService,
  ) {}

  presenter(row, fieldName) {
    return OrderModel.presenter(row, fieldName);
  }

  i18n(key) {
    return i18n(key);
  }

  async doDestroy(id) {
    const response = await this.confirmService.confirm();

    if (!response) {
      return;
    }

    return this.destroyService.doDestroy(id);
  }

  get hasPermissionToEdit() {
    return this.orderService.hasPermissionToEdit;
  }

  get hasPermissionToDestroy() {
    return this.orderService.hasPermissionToDestroy;
  }

  get fields() {
    return OrderModel.fields;
  }

  get columns() {
    return [
      '_select',

      this.fields.carId.name,
      this.fields.bookingAmount.name,
      this.fields.shippingAddress.name,
      this.fields.paymentMethod.name,
      this.fields.deliveryAddress.name,
      this.fields.pickupTime.name,
      this.fields.deliveryTime.name,

      '_actions',
    ];
  }
}
