import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-servicios',
  templateUrl: './dashboard-servicios.component.html',
  styleUrls: ['./dashboard-servicios.component.css']
})
export class DashboardServiciosComponent implements OnInit {

  popupEliminarVisible: boolean = false;
  servicios: any[] = [];
  indiceServicioAEliminar: number = -1;

  constructor(private servicioService: ServicioService, private router: Router) { }

  ngOnInit(): void {
    this.loadServicios();
  }

  loadServicios(): void {
    this.servicioService.listarServicios().subscribe(
      (response) => {
        this.servicios = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  mostrarId(id: number) {
    console.log('Se ha hecho clic en el botón "Actualizar servicio"');
    console.log('El id del servicio seleccionado es:', id);
  }

  eliminar(servicio: any): void {
    console.log("Servicio a eliminar:", servicio);
    const idServicio: number = servicio.id;
    if (!isNaN(idServicio)) {
      this.servicioService.eliminarServicio(idServicio).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          if (response.deleted === true) {
            this.servicios.splice(this.indiceServicioAEliminar, 1);
          }
          this.cerrarEliminarPopup();
          this.loadServicios();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("ID de servicio no válido:", servicio.id);
    }
  }

  abrirEliminarPopup(indice: number): void {
    console.log('Se hizo clic en el ícono de eliminación en la fila número:', indice);
    console.log("Abrir popup para eliminar. Índice:", indice);
    this.popupEliminarVisible = true;
    this.indiceServicioAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceServicioAEliminar = -1;
  }
}
