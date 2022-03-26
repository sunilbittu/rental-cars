import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-customer-importer',
  templateUrl: './customer-importer.component.html',
})
export class CustomerImporterComponent {
  constructor(private authService: AuthService) {}

  breadcrumb = [
    [i18n('dashboard.menu'), '/'],
    [i18n('entities.customer.menu'), '/customer'],
    [i18n('entities.customer.importer.title')],
  ];
}
