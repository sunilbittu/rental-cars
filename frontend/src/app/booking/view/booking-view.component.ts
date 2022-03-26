import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingModel } from 'src/app/booking/booking-model';
import { BookingViewService } from 'src/app/booking/view/booking-view.service';
import { i18n } from 'src/i18n';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
})
export class BookingViewComponent implements OnInit {
  constructor(
    private service: BookingViewService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  async ngOnInit() {
    await this.service.doFind(
      this.route.snapshot.paramMap.get('id'),
    );
  }

  presenter(row, fieldName) {
    return BookingModel.presenter(row, fieldName);
  }

  get fields() {
    return BookingModel.fields;
  }

  get loading() {
    return this.service.loading;
  }

  get record() {
    return this.service.record;
  }

  breadcrumb = [
    [i18n('dashboard.menu'), '/'],
    [i18n('entities.booking.menu'), '/booking'],
    [i18n('entities.booking.view.title')],
  ];
}
