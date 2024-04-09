import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentesComponent } from './componentes/componentes.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { SobreNosotrosComponent } from './componentes/sobre-nosotros/sobre-nosotros.component';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardUsuariosComponent } from './componentes/dashboard-usuarios/dashboard-usuarios.component';
import { CrudUsuariosComponent } from './componentes/crud-usuarios/crud-usuarios.component';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardEmpleadosComponent } from './componentes/dashboard-empleados/dashboard-empleados.component';
import { DashboardClientesComponent } from './componentes/dashboard-clientes/dashboard-clientes.component';
import { CrudClientesComponent } from './componentes/crud-clientes/crud-clientes.component';
import { DashboardProductosComponent } from './componentes/dashboard-productos/dashboard-productos.component';
import { DashboardServiciosComponent } from './componentes/dashboard-servicios/dashboard-servicios.component';
import { CrudServiciosComponent } from './componentes/crud-servicios/crud-servicios.component';
import { CrudProductosComponent } from './componentes/crud-productos/crud-productos.component';
import { CrudEmpleadosComponent } from './componentes/crud-empleados/crud-empleados.component';
import { DashboardReservacionesComponent } from './componentes/dashboard-reservaciones/dashboard-reservaciones.component';
import { CrudReservacionesComponent } from './componentes/crud-reservaciones/crud-reservaciones.component';
import { NuevoComponent } from './componentes/nuevo/nuevo.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DashboardCategoriasComponent } from './componentes/dashboard-categorias/dashboard-categorias.component';
import { CrudCategoriasComponent } from './componentes/crud-categorias/crud-categorias.component';
import { CrudResenasComponent } from './componentes/crud-resenas/crud-resenas.component';
import { DashboardResenasComponent } from './componentes/dashboard-resenas/dashboard-resenas.component';
import { DashboardPagosComponent } from './componentes/dashboard-pagos/dashboard-pagos.component';
import { CrudPagosComponent } from './componentes/crud-pagos/crud-pagos.component';
import { DashboardContactosComponent } from './componentes/dashboard-contactos/dashboard-contactos.component';
import { CrudContactosComponent } from './componentes/crud-contactos/crud-contactos.component';
import { CrudDetallesComponent } from './componentes/crud-detalles/crud-detalles.component';
import { DashboardDetallesComponent } from './componentes/dashboard-detalles/dashboard-detalles.component';
import { CrudTicketsComponent } from './componentes/crud-tickets/crud-tickets.component';
import { DashboardTicketsComponent } from './componentes/dashboard-tickets/dashboard-tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentesComponent,
    ContactoComponent,
    FooterComponent,
    InicioComponent,
    MenuComponent,
    ProductosComponent,
    ServiciosComponent,
    SobreNosotrosComponent,
    LoginComponent,
    DashboardUsuariosComponent,
    CrudUsuariosComponent,
    MenuLateralComponent,
    CrudEmpleadosComponent,
    DashboardEmpleadosComponent,
    DashboardClientesComponent,
    CrudClientesComponent,
    DashboardProductosComponent,
    DashboardServiciosComponent,
    CrudServiciosComponent,
    CrudProductosComponent,
    DashboardReservacionesComponent,
    CrudReservacionesComponent,
    NuevoComponent,
    DashboardCategoriasComponent,
    CrudCategoriasComponent,
    CrudResenasComponent,
    DashboardResenasComponent,
    DashboardPagosComponent,
    CrudPagosComponent,
    DashboardContactosComponent,
    CrudContactosComponent,
    CrudDetallesComponent,
    DashboardDetallesComponent,
    CrudTicketsComponent,
    DashboardTicketsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
