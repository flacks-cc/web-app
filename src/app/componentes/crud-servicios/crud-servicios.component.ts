import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/servicios/servicio/servicio.service';

@Component({
  selector: 'app-crud-servicios',
  templateUrl: './crud-servicios.component.html',
  styleUrls: ['./crud-servicios.component.css']
})
export class CrudServiciosComponent implements OnInit {

  titulo = 'Agregar servicio';
  submitted = false;
  formServicio: FormGroup;
  idServicio: number | null = null;

  constructor(
    public fb: FormBuilder,
    public servicioService: ServicioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formServicio = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')]] // Patrón para precio con máximo de 2 decimales
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['idServicio']) {
        this.idServicio = +params['idServicio'];
        console.log('Se abrió la página para actualizar el servicio con idServicio:', this.idServicio);
        this.esEditar();
      } else {
        console.log('Se abrió la página para agregar un nuevo servicio.');
      }
    });
  }

  esEditar(): void {
    if (this.idServicio !== null) {
      this.titulo = 'Editar servicio';
      this.servicioService.getService(this.idServicio).subscribe(response => {
        this.formServicio.patchValue(response); // Utiliza patchValue para llenar el formulario con los datos del servicio
      });
    }
  }

  editar(idServicio: number): void {
    const servicio = this.formServicio.value;
    this.servicioService.updateService(idServicio, servicio).subscribe(response => {
      this.router.navigate(['dashboard-servicios']);
    }, error => {
      console.error('Error al actualizar el servicio:', error);
    });
  }
  
  agregar(): void {
    const servicio = this.formServicio.value;
    this.servicioService.createService(servicio).subscribe(response => {
      this.router.navigate(['dashboard-servicios']);
    }, error => {
      console.error('Error al agregar el servicio:', error);
    });
  }

  agregarOEditar(): void {
    this.submitted = true;
    if (this.formServicio.invalid) {
      return;
    }

    if (this.idServicio === null) {
      this.agregar();
    } else {
      this.editar(this.idServicio);
    }
  }
}
