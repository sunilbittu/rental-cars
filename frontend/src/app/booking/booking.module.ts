import { NgModule } from '@angular/core';
import { LayoutModule } from 'src/app/layout/layout.module';
import {
  BookingRoutingModule,
  routedComponents,
} from 'src/app/booking/booking-routing.module';
import { BookingListFilterComponent } from 'src/app/booking/list/filter/booking-list-filter.component';
import { BookingListTableComponent } from 'src/app/booking/list/table/booking-list-table.component';
import { BookingListToolbarComponent } from 'src/app/booking/list/toolbar/booking-list-toolbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookingViewToolbarComponent } from 'src/app/booking/view/booking-view-toolbar.component';
import { ImporterService } from 'src/app/shared/importer/importer.service';
import { BookingImporterService } from 'src/app/booking/importer/booking-importer.service';
import { AppFormAutocompleteModule } from 'src/app/app-form-autocomplete.module';

@NgModule({
  declarations: [
    ...routedComponents,
    BookingListFilterComponent,
    BookingListTableComponent,
    BookingListToolbarComponent,
    BookingViewToolbarComponent,
  ],
  imports: [
    SharedModule,
    BookingRoutingModule,
    LayoutModule,
    AppFormAutocompleteModule,
  ],
  exports: [],
  providers: [
    {
      provide: ImporterService,
      useClass: BookingImporterService,
    },
  ],
})
export class BookingModule {}
