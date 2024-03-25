import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';

@Component({
  selector: 'app-dashboard-servicios',
  templateUrl: './dashboard-servicios.component.html',
  styleUrls: ['./dashboard-servicios.component.css']
})
export class DashboardServiciosComponent implements OnInit {

  popupEliminarVisible: boolean = false;
  servicios: any;
  indiceServicioAEliminar: number = -1; // Nuevo

  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.servicioService.getAllServices().subscribe(response => {
      this.servicios = response;
    },
      error => {
        console.error(error);
      });
  }

  eliminar(servicio: any): void {
    this.servicioService.deleteService(servicio.idServicio).subscribe(response => {
      if (response.deleted == true) {
        this.servicios.splice(this.indiceServicioAEliminar, 1);
      }
      this.cerrarEliminarPopup();

      this.servicioService.getAllServices().subscribe(response => {
        this.servicios = response;
      });
    });
  }

  abrirEliminarPopup(indice: number): void {
    this.popupEliminarVisible = true;
    this.indiceServicioAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceServicioAEliminar = -1;
  }
}
