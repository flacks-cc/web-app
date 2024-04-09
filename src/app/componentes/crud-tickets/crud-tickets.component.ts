import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/servicios/ticket/ticket.service';

@Component({
  selector: 'app-crud-tickets',
  templateUrl: './crud-tickets.component.html',
  styleUrls: ['./crud-tickets.component.css']
})
export class CrudTicketsComponent implements OnInit {

  titulo = 'Agregar ticket';
  enviado = false;
  formularioTicket: FormGroup;
  id: number | null = null;

  constructor(
    public fb: FormBuilder,
    public ticketService: TicketService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioTicket = this.fb.group({
      montoPagado: ['', Validators.required],
      nombreEmpleado: ['', Validators.required],
      idUsuario: ['', Validators.required],
      idMetodoPago: ['', Validators.required],
      idDetalleGeneral: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        console.log('Se abrió la página para actualizar el ticket con ID:', this.id);
        this.esEditar(); // Llama a la función esEditar() cuando se abra la página para editar un ticket
      } else {
        console.log('Se abrió la página para agregar un nuevo ticket.');
      }
    });
}


  esEditar(): void {
    if (this.id !== null) {
      this.titulo = 'Editar ticket';
      this.ticketService.obtenerTicketPorId(this.id).subscribe(response => {
        this.formularioTicket.patchValue(response); // Utiliza patchValue para llenar el formulario con los datos del ticket
      });
    }
}

  
  guardar(): void {
    this.enviado = true;
    if (this.formularioTicket.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregar();
    } else {
      // Implementa la lógica para editar el ticket si es necesario
    }
}

  agregar(): void {
    const ticket = this.formularioTicket.value;
    this.ticketService.crearTicket(ticket).subscribe(response => {
      this.router.navigate(['dashboard-tickets']);
    }, error => {
      console.error('Error al agregar el ticket:', error);
    });
  }
}
