import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';

@Component({
  selector: 'app-dashboard-tickets',
  templateUrl: './dashboard-tickets.component.html',
  styleUrls: ['./dashboard-tickets.component.css']
})
export class DashboardTicketsComponent implements OnInit {

  popupEliminarVisible: boolean = false;
  tickets: any[] = [];
  indiceTicketAEliminar: number = -1;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.listarTickets().subscribe(
      (response) => {
        this.tickets = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  mostrarId(id: number): void {
    console.log('Se ha hecho clic en el botón "Actualizar ticket"');
    console.log('El id del ticket seleccionado es:', id);
  }
  

  eliminar(ticket: any): void {
    console.log("Ticket a eliminar:", ticket);
    const idTicket: number = ticket.idTicket;
    if (!isNaN(idTicket)) {
      this.ticketService.borrarTicket(idTicket).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          if (response.deleted === true) {
            this.tickets.splice(this.indiceTicketAEliminar, 1);
          }
          this.cerrarEliminarPopup();
          this.loadTickets();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("ID de ticket no válido:", ticket.idTicket);
    }
  }

  abrirEliminarPopup(indice: number): void {
    console.log('Se hizo clic en el ícono de eliminación en la fila número:', indice);
    console.log("Abrir popup para eliminar. Índice:", indice);
    this.popupEliminarVisible = true;
    this.indiceTicketAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceTicketAEliminar = -1;
  }

}
