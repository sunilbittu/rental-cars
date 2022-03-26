import { Component } from '@angular/core';
import { CustomerListService } from 'src/app/customer/list/customer-list.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { CustomerModel } from 'src/app/customer/customer-model';
import { ConfirmService } from 'src/app/shared/confirm/confirm.service';
import { CustomerDestroyService } from 'src/app/customer/destroy/customer-destroy.service';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-customer-list-table',
  templateUrl: './customer-list-table.component.html',
})
export class CustomerListTableComponent {
  constructor(
    public service: CustomerListService,
    public destroyService: CustomerDestroyService,
    public customerService: CustomerService,
    private confirmService: ConfirmService,
  ) {}

  presenter(row, fieldName) {
    return CustomerModel.presenter(row, fieldName);
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
    return this.customerService.hasPermissionToEdit;
  }

  get hasPermissionToDestroy() {
    return this.customerService.hasPermissionToDestroy;
  }

  get fields() {
    return CustomerModel.fields;
  }

  get columns() {
    return [
      '_select',

      this.fields.name.name,
      this.fields.email.name,
      this.fields.password.name,
      this.fields.phone.name,
      this.fields.gender.name,
      this.fields.location.name,
      this.fields.isAdmin.name,

      '_actions',
    ];
  }
}
