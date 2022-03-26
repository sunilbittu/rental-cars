import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { PermissionGuard } from 'src/app/auth/permission.guard';
import { Permissions } from 'src/security/permissions';
import { CarListComponent } from 'src/app/car/list/car-list.component';
import { CarViewComponent } from 'src/app/car/view/car-view.component';
import { CarImporterComponent } from 'src/app/car/importer/car-importer.component';
import { CarFormPageComponent } from 'src/app/car/form/car-form-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: ':id/edit',
        component: CarFormPageComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.carEdit,
        },
      },
      {
        path: 'new',
        component: CarFormPageComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.carCreate,
        },
      },
      {
        path: 'import',
        component: CarImporterComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.carImport,
        },
      },
      {
        path: ':id',
        component: CarViewComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.carRead,
        },
      },
      {
        path: '',
        component: CarListComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          permission: Permissions.values.carRead,
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
export class CarRoutingModule {}

export const routedComponents = [
  CarListComponent,
  CarFormPageComponent,
  CarViewComponent,
  CarImporterComponent,
];
