import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { Permissions } from 'src/security/permissions';
import { OrderListComponent } from 'src/app/order/list/order-list.component';
import { OrderViewComponent } from 'src/app/order/view/order-view.component';
import { OrderImporterComponent } from 'src/app/order/importer/order-importer.component';
import { OrderFormPageComponent } from 'src/app/order/form/order-form-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: ':id/edit',
        component: OrderFormPageComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.orderEdit,
        },
      },
      {
        path: 'new',
        component: OrderFormPageComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.orderCreate,
        },
      },
      {
        path: 'import',
        component: OrderImporterComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.orderImport,
        },
      },
      {
        path: ':id',
        component: OrderViewComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.orderRead,
        },
      },
      {
        path: '',
        component: OrderListComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.orderRead,
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
export class OrderRoutingModule {}

export const routedComponents = [
  OrderListComponent,
  OrderFormPageComponent,
  OrderViewComponent,
  OrderImporterComponent,
];
