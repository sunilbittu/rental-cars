import { Injectable } from '@angular/core';
import { CarApi } from 'src/app/car/car.api';
import carImporterFields from 'src/app/car/importer/car-importer-fields';
import { ErrorService } from 'src/app/shared/error/error.service';
import { i18n } from 'src/i18n';
import { ImporterService } from 'src/app/shared/importer/importer.service';

@Injectable({
  providedIn: 'root',
})
export class CarImporterService extends ImporterService {
  constructor(errorService: ErrorService) {
    super(
      errorService,
      CarApi.import,
      carImporterFields,
      i18n('entities.car.importer.fileName'),
      i18n('entities.car.importer.hint'),
    );
  }
}
