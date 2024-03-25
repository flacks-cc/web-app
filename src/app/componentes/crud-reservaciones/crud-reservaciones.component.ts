import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservacionService } from 'src/app/servicios/reservacion/reservacion.service';
import { fechaActualValidator } from 'src/app/validaciones/validaciones';

@Component({
  selector: 'app-crud-reservaciones',
  templateUrl: './crud-reservaciones.component.html',
  styleUrls: ['./crud-reservaciones.component.css']
})
export class CrudReservacionesComponent implements OnInit {

  titulo = 'Agregar reservacion';
  submitted = false;
  formReservacion: FormGroup;
  idReservacion: any | null;

  constructor(public fb: FormBuilder,
              public reservacionService: ReservacionService,
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.formReservacion = this.fb.group({
      nombreServicio: ['', Validators.required],
      fechaReservacion: ['', [Validators.required, Validators.pattern('^(?:\\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$'), fechaActualValidator]],
      horaReservacion: ['', [Validators.required, Validators.pattern('^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?$')]],
      nombreUsuario: ['', Validators.required]
    });

    this.idReservacion = this.aRoute.snapshot.paramMap.get('idReservacion');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.idReservacion !== null) {
      this.titulo = 'Editar reservacion';
      this.reservacionService.getReservation(this.idReservacion).subscribe(response => {

        this.formReservacion.setValue({
          nombreServicio: response.nombreServicio,
          fechaReservacion: response.fechaReservacion,
          horaReservacion: response.horaReservacion,
          nombreUsuario: response.nombreUsuario
        });
      });
    }
  }

  editar(idReservacion: any): void {
    const reservacion: any = {
      nombreServicio: this.formReservacion.value.nombreServicio,
      fechaReservacion: this.formReservacion.value.fechaReservacion,
      horaReservacion: this.formReservacion.value.horaReservacion,
      nombreUsuario: this.formReservacion.value.nombreUsuario
    };

    this.reservacionService.updateReservation(idReservacion, reservacion).subscribe(response => {
      this.router.navigate(['dashboard-reservaciones']);
    },
      error => {
        console.error(error);
      }
    );
  }

  agregar(): void {
    this.reservacionService.createReservation(this.formReservacion.value).subscribe(response => {
      this.router.navigate(['dashboard-reservaciones']);
    },
      error => {
        console.error(error);
      }
    );
  }

  agregarOEditar(): void {

    // Marcar todos los controles como "touched" para que las validaciones se activen
    this.formReservacion.markAllAsTouched();

    // Valida que todos los campos del formulario sean correctos
    this.submitted = true;
    if (this.formReservacion.invalid) {
      return;
    }
    
    if (this.idReservacion === null)
      this.agregar();
    else
      this.editar(this.idReservacion);
  }
}
