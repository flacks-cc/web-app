import { Component, OnInit } from '@angular/core';
import { ReservacionService } from 'src/app/servicios/reservacion/reservacion.service';

@Component({
  selector: 'app-dashboard-reservaciones',
  templateUrl: './dashboard-reservaciones.component.html',
  styleUrls: ['./dashboard-reservaciones.component.css']
})
export class DashboardReservacionesComponent implements OnInit {

  popupEliminarVisible: boolean = false;
  reservaciones: any;
  indiceReservacionAEliminar: number = -1;

  constructor(private reservacionService: ReservacionService) { }

  ngOnInit(): void {
    this.reservacionService.getAllReservations().subscribe(response => {
      this.reservaciones = response;
    },
      error => {
        console.error(error)
      });
  }

  eliminar(reservacion: any) {
    this.reservacionService.deleteReservation(reservacion.idReservacion).subscribe(response => {
      if (response.deleted == true) {
        this.reservaciones.splice(this.indiceReservacionAEliminar, 1);
      }
      this.cerrarEliminarPopup();

      this.reservacionService.getAllReservations().subscribe(response => {
      this.reservaciones = response;
    });
    });
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
