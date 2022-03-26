import { NgModule } from '@angular/core';
import { LayoutModule } from 'src/app/layout/layout.module';
import {
  CarRoutingModule,
  routedComponents,
} from 'src/app/car/car-routing.module';
import { CarListFilterComponent } from 'src/app/car/list/filter/car-list-filter.component';
import { CarListTableComponent } from 'src/app/car/list/table/car-list-table.component';
import { CarListToolbarComponent } from 'src/app/car/list/toolbar/car-list-toolbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarViewToolbarComponent } from 'src/app/car/view/car-view-toolbar.component';
import { ImporterService } from 'src/app/shared/importer/importer.service';
import { CarImporterService } from 'src/app/car/importer/car-importer.service';
import { AppFormAutocompleteModule } from 'src/app/app-form-autocomplete.module';

@NgModule({
  declarations: [
    ...routedComponents,
    CarListFilterComponent,
    CarListTableComponent,
    CarListToolbarComponent,
    CarViewToolbarComponent,
  ],
  imports: [
    SharedModule,
    CarRoutingModule,
    LayoutModule,
    AppFormAutocompleteModule,
  ],
  exports: [],
  providers: [
    {
      provide: ImporterService,
      useClass: CarImporterService,
    },
  ],
})
export class CarModule {}
