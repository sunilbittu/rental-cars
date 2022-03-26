import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { Permissions } from 'src/security/permissions';
import { CustomerListComponent } from 'src/app/customer/list/customer-list.component';
import { CustomerViewComponent } from 'src/app/customer/view/customer-view.component';
import { CustomerImporterComponent } from 'src/app/customer/importer/customer-importer.component';
import { CustomerFormPageComponent } from 'src/app/customer/form/customer-form-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: ':id/edit',
        component: CustomerFormPageComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.customerEdit,
        },
      },
      {
        path: 'new',
        component: CustomerFormPageComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.customerCreate,
        },
      },
      {
        path: 'import',
        component: CustomerImporterComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.customerImport,
        },
      },
      {
        path: ':id',
        component: CustomerViewComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.customerRead,
        },
      },
      {
        path: '',
        component: CustomerListComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.customerRead,
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
export class CustomerRoutingModule {}

export const routedComponents = [
  CustomerListComponent,
  CustomerFormPageComponent,
  CustomerViewComponent,
  CustomerImporterComponent,
];
