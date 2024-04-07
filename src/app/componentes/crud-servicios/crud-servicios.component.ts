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
  enviado = false;
  formularioServicio: FormGroup;
  id: number | null = null;

  constructor(
    public fb: FormBuilder,
    public servicioService: ServicioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioServicio = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')]], // Patrón para precio con máximo de 2 decimales
      duracion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        console.log('Se abrió la página para actualizar el servicio con ID:', this.id);
        this.esEditar();
      } else {
        console.log('Se abrió la página para agregar un nuevo servicio.');
      }
    });
  }

  esEditar(): void {
    if (this.id !== null) {
      this.titulo = 'Editar servicio';
      this.servicioService.obtenerServicioPorId(this.id).subscribe(response => {
        this.formularioServicio.patchValue(response); // Utiliza patchValue para llenar el formulario con los datos del servicio
      });
    }
  }

  guardar(): void {
    this.enviado = true;
    if (this.formularioServicio.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregar();
    } else {
      this.editar(this.id);
    }
  }

  editar(idServicio: number): void {
    const servicio = this.formularioServicio.value;
    this.servicioService.actualizarServicio(idServicio, servicio).subscribe(response => {
      this.router.navigate(['dashboard-servicios']);
    }, error => {
      console.error('Error al actualizar el servicio:', error);
    });
  }
  
  agregar(): void {
    const servicio = this.formularioServicio.value;
    this.servicioService.crearServicio(servicio).subscribe(response => {
      this.router.navigate(['dashboard-servicios']);
    }, error => {
      console.error('Error al agregar el servicio:', error);
    });
  }
}
