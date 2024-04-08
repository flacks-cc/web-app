import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/servicios/contacto/contacto.service';

@Component({
  selector: 'app-dashboard-contactos',
  templateUrl: './dashboard-contactos.component.html',
  styleUrls: ['./dashboard-contactos.component.css']
})
export class DashboardContactosComponent implements OnInit {
  contactos: any[] = [];
  popupEliminarVisible: boolean = false;
  indiceContactoAEliminar: number = -1;

  constructor(private contactoService: ContactoService) { }

  ngOnInit(): void {
    this.loadContactos();
  }

  loadContactos(): void {
    this.contactoService.listarContactos().subscribe(
      (response) => {
        this.contactos = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminar(contacto: any): void {
    const idContacto: number = contacto.id;
    if (!isNaN(idContacto)) {
      this.contactoService.eliminarContacto(idContacto).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          if (response.deleted === true) {
            this.contactos.splice(this.indiceContactoAEliminar, 1);
          }
          this.cerrarEliminarPopup();
          this.loadContactos();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("ID de contacto no válido:", contacto.id);
    }
  }

  abrirEliminarPopup(indice: number): void {
    this.popupEliminarVisible = true;
    this.indiceContactoAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceContactoAEliminar = -1;
  }

}
