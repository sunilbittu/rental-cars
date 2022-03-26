import { Injectable } from '@angular/core';
import { CustomerApi } from 'src/app/customer/customer.api';
import customerImporterFields from 'src/app/customer/importer/customer-importer-fields';
import { ErrorService } from 'src/app/shared/error/error.service';
import { i18n } from 'src/i18n';
import { ImporterService } from 'src/app/shared/importer/importer.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerImporterService extends ImporterService {
  constructor(errorService: ErrorService) {
    super(
      errorService,
      CustomerApi.import,
      customerImporterFields,
      i18n('entities.customer.importer.fileName'),
      i18n('entities.customer.importer.hint'),
    );
  }
}
