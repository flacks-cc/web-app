import { Component, OnInit } from '@angular/core';
import { DetalleService } from 'src/app/servicios/detalle/detalle.service';

@Component({
  selector: 'app-dashboard-detalles',
  templateUrl: './dashboard-detalles.component.html',
  styleUrls: ['./dashboard-detalles.component.css']
})
export class DashboardDetallesComponent implements OnInit {

  detalles: any[] = [];
  popupEliminarVisible: boolean = false;
  indiceDetalleAEliminar: number = -1;

  constructor(private detalleService: DetalleService) { }

  ngOnInit(): void {
    this.cargarDetalles();
  }

  cargarDetalles(): void {
    this.detalleService.listarDetalles().subscribe(
      (response) => {
        this.detalles = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminar(detalle: any): void {
    const idDetalle: number = detalle.id;
    if (!isNaN(idDetalle)) {
      this.detalleService.eliminarDetalle(idDetalle).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          if (response.deleted === true) {
            this.detalles.splice(this.indiceDetalleAEliminar, 1);
          }
          this.cerrarEliminarPopup();
          this.cargarDetalles();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("ID de detalle no válido:", detalle.id);
    }
  }

  abrirEliminarPopup(indice: number): void {
    this.popupEliminarVisible = true;
    this.indiceDetalleAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceDetalleAEliminar = -1;
  }

}
