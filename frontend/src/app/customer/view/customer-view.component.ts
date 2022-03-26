import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from 'src/app/customer/customer-model';
import { CustomerViewService } from 'src/app/customer/view/customer-view.service';
import { i18n } from 'src/i18n';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
})
export class CustomerViewComponent implements OnInit {
  constructor(
    private service: CustomerViewService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  async ngOnInit() {
    await this.service.doFind(
      this.route.snapshot.paramMap.get('id'),
    );
  }

  presenter(row, fieldName) {
    return CustomerModel.presenter(row, fieldName);
  }

  get fields() {
    return CustomerModel.fields;
  }

  get loading() {
    return this.service.loading;
  }

  get record() {
    return this.service.record;
  }

  breadcrumb = [
    [i18n('dashboard.menu'), '/'],
    [i18n('entities.customer.menu'), '/customer'],
    [i18n('entities.customer.view.title')],
  ];
}
