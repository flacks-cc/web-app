import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';

@Component({
  selector: 'app-dashboard-clientes',
  templateUrl: './dashboard-clientes.component.html',
  styleUrls: ['./dashboard-clientes.component.css']
})
export class DashboardClientesComponent implements OnInit {

  popupEliminarVisible: boolean = false;
  clientes: any;
  indiceClienteAEliminar: number = -1;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getAllClients().subscribe(response => {
      this.clientes = response;
    },
      error => {
        console.error(error)
      });
  }

  eliminar(cliente: any) {
    this.clienteService.deleteClient(cliente.idCliente).subscribe(response => {
      if (response.deleted == true) {
        this.clientes.splice(this.indiceClienteAEliminar, 1);
      }
      this.cerrarEliminarPopup();

      this.clienteService.getAllClients().subscribe(response => {
      this.clientes = response;
    });
    });
  }

  abrirEliminarPopup(indice: number): void {
    this.popupEliminarVisible = true;
    this.indiceClienteAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceClienteAEliminar = -1;
  }
}
