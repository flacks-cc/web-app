import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservacionService } from 'src/app/servicios/reservacion/reservacion.service';

@Component({
  selector: 'app-crud-reservaciones',
  templateUrl: './crud-reservaciones.component.html',
  styleUrls: ['./crud-reservaciones.component.css']
})
export class CrudReservacionesComponent implements OnInit {

  titulo = 'Agregar reservación';
  enviado = false;
  formularioReservacion: FormGroup;
  id: number | null = null;

  constructor(
    public fb: FormBuilder,
    public reservacionService: ReservacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioReservacion = this.fb.group({
      fechaReserva: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      idUsuario: ['', Validators.required],
      idServicio: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    // Lógica para editar una reservación existente
  }

  guardar(): void {
    this.enviado = true;
    if (this.formularioReservacion.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregar();
    } else {
      this.editar(this.id);
    }
  }

  editar(idReservacion: number): void {
    const reservacion = { ...this.formularioReservacion.value, id: idReservacion };
    this.reservacionService.actualizarReservacion(reservacion).subscribe(response => {
      this.router.navigate(['dashboard-reservaciones']);
    }, error => {
      console.error('Error al actualizar la reservación:', error);
    });
  }
  
  agregar(): void {
    const reservacion = this.formularioReservacion.value;
    this.reservacionService.crearReservacionComoAdmin(reservacion).subscribe(response => {
      this.router.navigate(['dashboard-reservaciones']);
    }, error => {
      console.error('Error al agregar la reservación:', error);
    });
  }
}
