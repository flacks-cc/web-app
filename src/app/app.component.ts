import { Component, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private router: Router, private renderer: Renderer2, private elementRef: ElementRef) { }

  // Método que se ejecuta después de que se haya inicializado la vista del componente
  ngAfterViewInit() {
    // Establece la pestaña activa en la barra de navegación
    this.setActiveTab();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Establece la pestaña activa en la barra de navegación
        this.setActiveTab();
      }
    });
  }

  // Método para determinar si se deben ocultar la barra de navegación y el pie de página
  HideNavFooter(): boolean {
    // Secciones en donde se esta ocultando la barra de navegación y el pie de página
    return this.router.url === '/login' ||

      this.router.url === '/dashboard-usuarios' ||
      this.router.url === '/crud-usuarios' ||
      this.router.url.startsWith('/editar-usuario/') ||

      this.router.url === '/dashboard-empleados' ||
      this.router.url === '/crud-empleados' ||
      this.router.url.startsWith('/editar-empleado/') ||

      this.router.url === '/dashboard-clientes' ||
      this.router.url === '/crud-clientes' ||
      this.router.url.startsWith('/editar-cliente/') ||

      this.router.url === '/dashboard-servicios' ||
      this.router.url === '/crud-servicios' ||
      this.router.url.startsWith('/editar-servicio/') ||

      this.router.url === '/dashboard-reservaciones' ||
      this.router.url === '/crud-reservaciones' ||
      this.router.url.startsWith('/editar-reservacion/') ||
      
      this.router.url === '/dashboard-categorias' ||
      this.router.url === '/crud-categorias' ||
      this.router.url.startsWith('/editar-categoria/')||

      this.router.url === '/dashboard-resenas' ||
      this.router.url === '/crud-resenas' ||
      this.router.url.startsWith('/editar-resena/')||

      this.router.url === '/dashboard-pagos' ||
      this.router.url === '/crud-pagos' ||
      this.router.url.startsWith('/editar-pago/')||

      this.router.url === '/dashboard-productos' ||
      this.router.url === '/crud-productos' ||
      this.router.url.startsWith('/editar-producto/');
      }
      
  // Método para establecer la pestaña activa en la barra de navegación
  private setActiveTab() {
    // Obtiene la ruta actual del enrutador
    const currentPath = this.router.url;
    // Obtiene todos los enlaces de navegación del elemento raíz del componente
    const navLinks = this.elementRef.nativeElement.querySelectorAll('.nav-link');

    // Recorre todos los enlaces de navegación
    navLinks.forEach((link: HTMLElement) => {
      // Si el atributo routerLink del enlace coincide con la ruta actual
      if (link.getAttribute('routerLink') === currentPath) {
        // Agrega la clase "activo" al enlace
        this.renderer.addClass(link, 'activo');
      } else {
        // Elimina la clase "activo" del enlace
        this.renderer.removeClass(link, 'activo');
      }
    });
  }
}
