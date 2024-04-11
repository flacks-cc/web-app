import { Component, OnInit } from '@angular/core';
import { PagoService } from 'src/app/servicios/pagos/pago.service';

@Component({
  selector: 'app-dashboard-pagos',
  templateUrl: './dashboard-pagos.component.html',
  styleUrls: ['./dashboard-pagos.component.css']
})
export class DashboardPagosComponent implements OnInit {

  popupEliminarVisible: boolean = false;
  pagos: any[] = [];
  indicePagoAEliminar: number = -1;

  constructor(private pagoService: PagoService) { }

  ngOnInit(): void {
    this.loadPagos();
  }

  loadPagos(): void {
    this.pagoService.listarMetodosPago().subscribe(
      (response) => {
        this.pagos = response;
      },
      (error) => {
        console.error('Error al cargar los pagos:', error);
      }
    );
  }

  mostrarId(id: number): void {
    console.log('Se ha hecho clic en el botón "Actualizar pago"');
    console.log('El id del pago seleccionado es:', id);
  }

  eliminar(id: number): void {
    console.log("ID del pago a eliminar:", id);
    if (!isNaN(id)) {
      this.pagoService.borrarMetodoPago(id).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          if (response.deleted === true) {
            this.pagos = this.pagos.filter(pago => pago.id !== id);
          }
          this.cerrarEliminarPopup();
          this.loadPagos();

        },
        (error) => {
          console.error('Error al eliminar el pago:', error);
        }
      );
    } else {
      console.error("ID de pago no válido:", id);
    }
  }

  abrirEliminarPopup(indice: number): void {
    console.log('Se hizo clic en el ícono de eliminación en la fila número:', indice);
    console.log("Abrir popup para eliminar. Índice:", indice);
    this.popupEliminarVisible = true;
    this.indicePagoAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indicePagoAEliminar = -1;
  }
}
