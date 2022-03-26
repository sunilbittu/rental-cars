import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-order-importer',
  templateUrl: './order-importer.component.html',
})
export class OrderImporterComponent {
  constructor(private authService: AuthService) {}

  breadcrumb = [
    [i18n('dashboard.menu'), '/'],
    [i18n('entities.order.menu'), '/order'],
    [i18n('entities.order.importer.title')],
  ];
}
