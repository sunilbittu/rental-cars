import { NgModule } from '@angular/core';
import { LayoutModule } from 'src/app/layout/layout.module';
import {
  CustomerRoutingModule,
  routedComponents,
} from 'src/app/customer/customer-routing.module';
import { CustomerListFilterComponent } from 'src/app/customer/list/filter/customer-list-filter.component';
import { CustomerListTableComponent } from 'src/app/customer/list/table/customer-list-table.component';
import { CustomerListToolbarComponent } from 'src/app/customer/list/toolbar/customer-list-toolbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerViewToolbarComponent } from 'src/app/customer/view/customer-view-toolbar.component';
import { ImporterService } from 'src/app/shared/importer/importer.service';
import { CustomerImporterService } from 'src/app/customer/importer/customer-importer.service';
import { AppFormAutocompleteModule } from 'src/app/app-form-autocomplete.module';

@NgModule({
  declarations: [
    ...routedComponents,
    CustomerListFilterComponent,
    CustomerListTableComponent,
    CustomerListToolbarComponent,
    CustomerViewToolbarComponent,
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule,
    LayoutModule,
    AppFormAutocompleteModule,
  ],
  exports: [],
  providers: [
    {
      provide: ImporterService,
      useClass: CustomerImporterService,
    },
  ],
})
export class CustomerModule {}
