import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  // Agregar una variable de estado para rastrear si estamos en modo responsivo o no
  isResponsiveMode: boolean = false;
  popupCerrarVisible: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    // Llamar a la función onResize cuando se carga el componente
    this.onResize();
  }

  // Lógica del menú desplegable
  toggleAside() {
    // Solo ejecutar esta función si no estamos en modo responsivo
    if (!this.isResponsiveMode) {
      const aside = document.getElementById('aside');
      const menu = document.getElementById('main');
      if (aside && menu) {
        aside.classList.toggle('active');
        menu.classList.toggle('active');

        // Obtener una lista de todos los elementos div dentro del elemento aside
        const divs = aside.querySelectorAll(".options div");

        // Si el elemento aside tiene la clase .active
        if (aside.classList.contains("active")) {
          // Recorrer la lista de elementos div
          for (let i = 0; i < divs.length; i++) {
            // Obtener una referencia al elemento span dentro del elemento div
            const span = divs[i].querySelector("span");

            // Si el elemento span existe
            if (span) {
              // Obtener el texto del elemento span
              const text = span.textContent;

              // Si el valor de text no es null
              if (text !== null) {
                // Agregar la propiedad title al elemento div con el valor del texto obtenido
                divs[i].setAttribute("title", text);
              }
            }
          }
        } else {
          // Recorrer la lista de elementos div
          for (let i = 0; i < divs.length; i++) {
            // Eliminar la propiedad title del elemento div
            divs[i].removeAttribute("title");
          }
        }
      }
    }
  }

  // Función para detectar cambios en el tamaño de la pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    // Obtener el ancho de la pantalla
    const screenWidth = event ? event.target.innerWidth : window.innerWidth;

    // Obtener una referencia al elemento aside y al elemento main
    const aside = document.getElementById('aside');
    const menu = document.getElementById('main');

    // Si el elemento aside existe
    if (aside && menu) {
      // Si el ancho de la pantalla es menor o igual a 768px
      if (screenWidth <= 768) {
        // Establecer isResponsiveMode en true
        this.isResponsiveMode = true;

        // Agregar la clase .active al elemento aside y al elmento main
        aside.classList.add('active');
        menu.classList.add('active');

        // Obtener una lista de todos los elementos div dentro del elemento aside
        const divs = aside.querySelectorAll(".options div");

        // Recorrer la lista de elementos div
        for (let i = 0; i < divs.length; i++) {
          // Obtener una referencia al elemento span dentro del elemento div
          const span = divs[i].querySelector("span");

          // Si el elemento span existe
          if (span) {
            // Obtener el texto del elemento span
            const text = span.textContent;

            // Si el valor de text no es null
            if (text !== null) {
              // Agregar la propiedad title al elemento div con el valor del texto obtenido
              divs[i].setAttribute("title", text);
            }
          }
        }
      } else {
        // Establecer isResponsiveMode en false
        this.isResponsiveMode = false;

        // Eliminar la clase .active del elemento aside y el elemento menu
        aside.classList.remove('active');
        menu.classList.remove('active');

        // Obtener una lista de todos los elementos div dentro del elemento aside
        const divs = aside.querySelectorAll(".options div");

        // Recorrer la lista de elementos div
        for (let i = 0; i < divs.length; i++) {
          // Eliminar la propiedad title del elemento div
          divs[i].removeAttribute("title");
        }
      }
    }
  }


  abrirCerrarPopup(): void {
    this.popupCerrarVisible = true;
  }

  cerrarCerrarPopup(): void {
    this.popupCerrarVisible = false;
  }

  // Método para cerrar la sesión
    cierraSesion() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.router.navigate(['/menu']);
  }
}
