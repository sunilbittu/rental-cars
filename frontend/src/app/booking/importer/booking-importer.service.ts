import { Injectable } from '@angular/core';
import { BookingApi } from 'src/app/booking/booking.api';
import bookingImporterFields from 'src/app/booking/importer/booking-importer-fields';
import { ErrorService } from 'src/app/shared/error/error.service';
import { i18n } from 'src/i18n';
import { ImporterService } from 'src/app/shared/importer/importer.service';

@Injectable({
  providedIn: 'root',
})
export class BookingImporterService extends ImporterService {
  constructor(errorService: ErrorService) {
    super(
      errorService,
      BookingApi.import,
      bookingImporterFields,
      i18n('entities.booking.importer.fileName'),
      i18n('entities.booking.importer.hint'),
    );
  }
}
