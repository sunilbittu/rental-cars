import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-car-importer',
  templateUrl: './car-importer.component.html',
})
export class CarImporterComponent {
  constructor(private authService: AuthService) {}

  breadcrumb = [
    [i18n('dashboard.menu'), '/'],
    [i18n('entities.car.menu'), '/car'],
    [i18n('entities.car.importer.title')],
  ];
}
