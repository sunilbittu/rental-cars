import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarModel } from 'src/app/car/car-model';
import { CarViewService } from 'src/app/car/view/car-view.service';
import { i18n } from 'src/i18n';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
})
export class CarViewComponent implements OnInit {
  constructor(
    private service: CarViewService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  async ngOnInit() {
    await this.service.doFind(
      this.route.snapshot.paramMap.get('id'),
    );
  }

  presenter(row, fieldName) {
    return CarModel.presenter(row, fieldName);
  }

  get fields() {
    return CarModel.fields;
  }

  get loading() {
    return this.service.loading;
  }

  get record() {
    return this.service.record;
  }

  breadcrumb = [
    [i18n('dashboard.menu'), '/'],
    [i18n('entities.car.menu'), '/car'],
    [i18n('entities.car.view.title')],
  ];
}
