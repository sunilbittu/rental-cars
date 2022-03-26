import { Injectable } from '@angular/core';
import { OrderApi } from 'src/app/order/order.api';
import orderImporterFields from 'src/app/order/importer/order-importer-fields';
import { ErrorService } from 'src/app/shared/error/error.service';
import { i18n } from 'src/i18n';
import { ImporterService } from 'src/app/shared/importer/importer.service';

@Injectable({
  providedIn: 'root',
})
export class OrderImporterService extends ImporterService {
  constructor(errorService: ErrorService) {
    super(
      errorService,
      OrderApi.import,
      orderImporterFields,
      i18n('entities.order.importer.fileName'),
      i18n('entities.order.importer.hint'),
    );
  }
}
