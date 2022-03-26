import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { Permissions } from 'src/security/permissions';
import { BookingListComponent } from 'src/app/booking/list/booking-list.component';
import { BookingViewComponent } from 'src/app/booking/view/booking-view.component';
import { BookingImporterComponent } from 'src/app/booking/importer/booking-importer.component';
import { BookingFormPageComponent } from 'src/app/booking/form/booking-form-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: ':id/edit',
        component: BookingFormPageComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.bookingEdit,
        },
      },
      {
        path: 'new',
        component: BookingFormPageComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.bookingCreate,
        },
      },
      {
        path: 'import',
        component: BookingImporterComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.bookingImport,
        },
      },
      {
        path: ':id',
        component: BookingViewComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.bookingRead,
        },
      },
      {
        path: '',
        component: BookingListComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.bookingRead,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class BookingRoutingModule {}

export const routedComponents = [
  BookingListComponent,
  BookingFormPageComponent,
  BookingViewComponent,
  BookingImporterComponent,
];
