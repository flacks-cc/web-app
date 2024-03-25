import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';
import { noCero, noDecimales, noNegativos } from 'src/app/validaciones/validaciones';

@Component({
  selector: 'app-crud-servicios',
  templateUrl: './crud-servicios.component.html',
  styleUrls: ['./crud-servicios.component.css']
})
export class CrudServiciosComponent implements OnInit {

  titulo = 'Agregar servicio';
  submitted = false;
  formServicio: FormGroup;
  idServicio: any | null;

  constructor(public fb: FormBuilder,
              public servicioService: ServicioService,
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.formServicio = this.fb.group({
      nombreServicio: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion: ['', [Validators.required, noNegativos, noDecimales, noCero]],
      precio: ['', [Validators.required, noNegativos, noDecimales, noCero]]
    });

    this.idServicio = this.aRoute.snapshot.paramMap.get('idServicio');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.idServicio !== null) {
      this.titulo = 'Editar servicio';
      this.servicioService.getService(this.idServicio).subscribe(response => {

        this.formServicio.setValue({
          nombreServicio: response.nombreServicio,
          descripcion: response.descripcion,
          duracion: response.duracion,
          precio: response.precio
        });
      });
    }
  }

  editar(idServicio: any): void {
    const servicio: any = {
      nombreServicio: this.formServicio.value.nombreServicio,
      descripcion: this.formServicio.value.descripcion,
      duracion: this.formServicio.value.duracion,
      precio: this.formServicio.value.precio
    };

    this.servicioService.updateService(idServicio, servicio).subscribe(response => {
      this.router.navigate(['dashboard-servicios']);
    },
      error => {
        console.error(error);
      }
    );
  }

  agregar(): void {
    this.servicioService.createService(this.formServicio.value).subscribe(response => {
      this.router.navigate(['dashboard-servicios']);
    },
      error => {
        console.error(error);
      }
    );
  }

  agregarOEditar(): void {

    // Marcar todos los controles como "touched" para que las validaciones se activen
    this.formServicio.markAllAsTouched();

    // Valida que todos los campos del formulario sean correctos
    this.submitted = true;
    if (this.formServicio.invalid) {
      return;
    }

    if (this.idServicio === null)
      this.agregar();
    else
      this.editar(this.idServicio);
  }
}
