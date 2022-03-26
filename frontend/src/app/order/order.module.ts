import { NgModule } from '@angular/core';
import { LayoutModule } from 'src/app/layout/layout.module';
import {
  OrderRoutingModule,
  routedComponents,
} from 'src/app/order/order-routing.module';
import { OrderListFilterComponent } from 'src/app/order/list/filter/order-list-filter.component';
import { OrderListTableComponent } from 'src/app/order/list/table/order-list-table.component';
import { OrderListToolbarComponent } from 'src/app/order/list/toolbar/order-list-toolbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderViewToolbarComponent } from 'src/app/order/view/order-view-toolbar.component';
import { ImporterService } from 'src/app/shared/importer/importer.service';
import { OrderImporterService } from 'src/app/order/importer/order-importer.service';
import { AppFormAutocompleteModule } from 'src/app/app-form-autocomplete.module';

@NgModule({
  declarations: [
    ...routedComponents,
    OrderListFilterComponent,
    OrderListTableComponent,
    OrderListToolbarComponent,
    OrderViewToolbarComponent,
  ],
  imports: [
    SharedModule,
    OrderRoutingModule,
    LayoutModule,
    AppFormAutocompleteModule,
  ],
  exports: [],
  providers: [
    {
      provide: ImporterService,
      useClass: OrderImporterService,
    },
  ],
})
export class OrderModule {}
