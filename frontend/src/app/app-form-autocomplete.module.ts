import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { TenantFormComponent } from 'src/app/tenant/form/tenant-form.component';

import { UserNewFormComponent } from 'src/app/user/form/user-new-form.component';
import { UserNewFormModalComponent } from 'src/app/user/form/user-new-form-modal.component';
import { UserNewFormModalService } from 'src/app/user/form/user-new-form-modal.service';
import { UserFormFieldComponent } from 'src/app/user/autocomplete/user-form-field.component';

import { CustomerFormFieldComponent } from 'src/app/customer/autocomplete/customer-form-field.component';
import { CustomerFormModalComponent } from 'src/app/customer/form/customer-form-modal.component';
import { CustomerFormModalService } from 'src/app/customer/form/customer-form-modal.service';
import { CustomerFormComponent } from 'src/app/customer/form/customer-form.component';

import { CarFormFieldComponent } from 'src/app/car/autocomplete/car-form-field.component';
import { CarFormModalComponent } from 'src/app/car/form/car-form-modal.component';
import { CarFormModalService } from 'src/app/car/form/car-form-modal.service';
import { CarFormComponent } from 'src/app/car/form/car-form.component';

import { OrderFormFieldComponent } from 'src/app/order/autocomplete/order-form-field.component';
import { OrderFormModalComponent } from 'src/app/order/form/order-form-modal.component';
import { OrderFormModalService } from 'src/app/order/form/order-form-modal.service';
import { OrderFormComponent } from 'src/app/order/form/order-form.component';

import { BookingFormFieldComponent } from 'src/app/booking/autocomplete/booking-form-field.component';
import { BookingFormModalComponent } from 'src/app/booking/form/booking-form-modal.component';
import { BookingFormModalService } from 'src/app/booking/form/booking-form-modal.service';
import { BookingFormComponent } from 'src/app/booking/form/booking-form.component';

/**
 * This module exists to avoid circular dependencies, because autocompletes and forms
 * from different modules may use each others.
 */
@NgModule({
  declarations: [
    TenantFormComponent,

    UserNewFormComponent,
    UserFormFieldComponent,
    UserNewFormModalComponent,

    CustomerFormComponent,
    CustomerFormFieldComponent,
    CustomerFormModalComponent,

    CarFormComponent,
    CarFormFieldComponent,
    CarFormModalComponent,

    OrderFormComponent,
    OrderFormFieldComponent,
    OrderFormModalComponent,

    BookingFormComponent,
    BookingFormFieldComponent,
    BookingFormModalComponent,
  ],
  imports: [SharedModule],
  exports: [
    TenantFormComponent,

    UserNewFormComponent,
    UserFormFieldComponent,

    CustomerFormComponent,
    CustomerFormFieldComponent,

    CarFormComponent,
    CarFormFieldComponent,

    OrderFormComponent,
    OrderFormFieldComponent,

    BookingFormComponent,
    BookingFormFieldComponent,
  ],
  providers: [
    UserNewFormModalService,
    CustomerFormModalService,

    CarFormModalService,

    OrderFormModalService,

    BookingFormModalService,
  ],
  entryComponents: [
    UserNewFormModalComponent,
    CustomerFormModalComponent,

    CarFormModalComponent,

    OrderFormModalComponent,

    BookingFormModalComponent,
  ],
})
export class AppFormAutocompleteModule {}
