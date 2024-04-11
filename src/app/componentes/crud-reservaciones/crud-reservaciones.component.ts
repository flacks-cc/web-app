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
  submitted = false;
  formReservacion: FormGroup;
  idReservacion: number | null = null;

  constructor(
    public fb: FormBuilder,
    public reservacionService: ReservacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formReservacion = this.fb.group({
      fechaReserva: ['', Validators.required],
      horaInicio: ['', Validators.required],
      idUsuario: ['', Validators.required],
      idServicio: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    
  }

  agregarOEditar(): void {
    this.submitted = true;
    if (this.formReservacion.invalid) {
      return;
    }
    if (this.idReservacion === null) {
      this.agregar();
    } else {
      this.editar(this.idReservacion);
    }
  }

  editar(idReservacion: number): void {
    const reservacion = { ...this.formReservacion.value, idReservacion: idReservacion };
    this.reservacionService.updateReservation(reservacion).subscribe(response => {
      this.router.navigate(['dashboard-reservaciones']);
    }, error => {
      console.error('Error al actualizar la reservación:', error);
    });
  }
  
  agregar(): void {
    const reservacion = this.formReservacion.value;
    this.reservacionService.createreservation(reservacion).subscribe(response => {
      this.router.navigate(['dashboard-reservaciones']);
    }, error => {
      console.error('Error al agregar la reservación:', error);
    });
  }
}
