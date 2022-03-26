import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { i18n } from 'src/i18n';

@Component({
  selector: 'app-booking-importer',
  templateUrl: './booking-importer.component.html',
})
export class BookingImporterComponent {
  constructor(private authService: AuthService) {}

  breadcrumb = [
    [i18n('dashboard.menu'), '/'],
    [i18n('entities.booking.menu'), '/booking'],
    [i18n('entities.booking.importer.title')],
  ];
}
