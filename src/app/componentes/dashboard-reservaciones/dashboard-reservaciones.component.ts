import { Component, OnInit } from '@angular/core';
import { ReservacionService } from 'src/app/servicios/reservacion/reservacion.service';

@Component({
  selector: 'app-dashboard-reservaciones',
  templateUrl: './dashboard-reservaciones.component.html',
  styleUrls: ['./dashboard-reservaciones.component.css']
})
export class DashboardReservacionesComponent implements OnInit {

  reservaciones: any[] = [];
  popupEliminarVisible: boolean = false;
  indiceReservacionAEliminar: number = -1;

  constructor(private reservacionService: ReservacionService) { }

  ngOnInit(): void {
    this.cargarReservaciones();
  }

  cargarReservaciones(): void {
    this.reservacionService.listarReservaciones().subscribe(
      (response) => {
        this.reservaciones = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminar(reservacion: any): void {
    const idReservacion: number = reservacion.id;
    if (!isNaN(idReservacion)) {
      this.reservacionService.eliminarReservacion(idReservacion).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          if (response.deleted === true) {
            this.reservaciones.splice(this.indiceReservacionAEliminar, 1);
          }
          this.cerrarEliminarPopup();
          this.cargarReservaciones();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("ID de reservación no válido:", reservacion.id);
    }
  }

  abrirEliminarPopup(indice: number): void {
    this.popupEliminarVisible = true;
    this.indiceReservacionAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceReservacionAEliminar = -1;
  }

}
