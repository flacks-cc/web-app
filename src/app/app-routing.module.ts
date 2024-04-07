import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { SobreNosotrosComponent } from './componentes/sobre-nosotros/sobre-nosotros.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardUsuariosComponent } from './componentes/dashboard-usuarios/dashboard-usuarios.component';
import { CrudUsuariosComponent } from './componentes/crud-usuarios/crud-usuarios.component';
import { DashboardEmpleadosComponent } from './componentes/dashboard-empleados/dashboard-empleados.component';
import { CrudEmpleadosComponent } from './componentes/crud-empleados/crud-empleados.component';
import { DashboardClientesComponent } from './componentes/dashboard-clientes/dashboard-clientes.component';
import { CrudClientesComponent } from './componentes/crud-clientes/crud-clientes.component';
import { DashboardServiciosComponent } from './componentes/dashboard-servicios/dashboard-servicios.component';
import { CrudServiciosComponent } from './componentes/crud-servicios/crud-servicios.component';
import { DashboardProductosComponent } from './componentes/dashboard-productos/dashboard-productos.component';
import { CrudProductosComponent } from './componentes/crud-productos/crud-productos.component';
import { DashboardReservacionesComponent } from './componentes/dashboard-reservaciones/dashboard-reservaciones.component';
import { CrudReservacionesComponent } from './componentes/crud-reservaciones/crud-reservaciones.component';
import { AuthGuard } from './guards/auth.guard';
import { NuevoComponent } from './componentes/nuevo/nuevo.component';


const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'servicios',
    component: ServiciosComponent
  },
  {
    path: 'sobre-nosotros',
    component: SobreNosotrosComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'nuevo',
    component: NuevoComponent
  },
  {
    path: 'dashboard-usuarios',
    component: DashboardUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crud-usuarios',
    component: CrudUsuariosComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'editar-usuario/:id',
    component: CrudUsuariosComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'dashboard-empleados',
    component: DashboardEmpleadosComponent,
  },
  {
    path: 'crud-empleados',
    component: CrudEmpleadosComponent,
  },
  {
    path: 'editar-empleado/:idEmpleado',
    component: CrudEmpleadosComponent,
  },
  {
    path: 'dashboard-clientes',
    component: DashboardClientesComponent,
  },
  {
    path: 'crud-clientes',
    component: CrudClientesComponent,
  },
  {
    path: 'editar-cliente/:idCliente',
    component: CrudClientesComponent,
  },
  {
    path: 'dashboard-servicios',
    component: DashboardServiciosComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'crud-servicios',
    component: CrudServiciosComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'editar-servicio/:id',
    component: CrudServiciosComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'dashboard-productos',
    component: DashboardProductosComponent,
  },
  {
    path: 'crud-productos',
    component: CrudProductosComponent,
  },
  {
    path: 'editar-producto/:idProducto',
    component: CrudProductosComponent,
  },
  {
    path: 'dashboard-reservaciones',
    component: DashboardReservacionesComponent,
  },
  {
    path: 'crud-reservaciones',
    component: CrudReservacionesComponent,
  },
  {
    path: 'editar-reservacion/:idReservacion',
    component: CrudReservacionesComponent,
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
