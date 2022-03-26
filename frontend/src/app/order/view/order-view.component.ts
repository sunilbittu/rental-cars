import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderModel } from 'src/app/order/order-model';
import { OrderViewService } from 'src/app/order/view/order-view.service';
import { i18n } from 'src/i18n';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
})
export class OrderViewComponent implements OnInit {
  constructor(
    private service: OrderViewService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  async ngOnInit() {
    await this.service.doFind(
      this.route.snapshot.paramMap.get('id'),
    );
  }

  presenter(row, fieldName) {
    return OrderModel.presenter(row, fieldName);
  }

  get fields() {
    return OrderModel.fields;
  }

  get loading() {
    return this.service.loading;
  }

  get record() {
    return this.service.record;
  }

  breadcrumb = [
    [i18n('dashboard.menu'), '/'],
    [i18n('entities.order.menu'), '/order'],
    [i18n('entities.order.view.title')],
  ];
}
