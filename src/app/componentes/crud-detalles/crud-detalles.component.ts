import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleService } from 'src/app/servicios/detalle/detalle.service';

@Component({
  selector: 'app-crud-detalles',
  templateUrl: './crud-detalles.component.html',
  styleUrls: ['./crud-detalles.component.css']
})
export class CrudDetallesComponent implements OnInit {

  titulo = 'Agregar detalle';
  enviado = false;
  formularioDetalle: FormGroup;
  id: number | null = null;

  constructor(
    public fb: FormBuilder,
    public detalleService: DetalleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioDetalle = this.fb.group({
      cantidad: ['', Validators.required],
      idUsuario: ['', Validators.required],
      idProducto: ['', Validators.required],
      idReservacion: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        console.log('Se abrió la página para actualizar el detalle con ID:', this.id);
        this.esEditar();
      } else {
        console.log('Se abrió la página para agregar un nuevo detalle.');
      }
    });
  }

  esEditar(): void {
    if (this.id !== null) {
      this.titulo = 'Editar detalle';
      // Aquí podrías implementar la lógica para cargar los datos del detalle si se está editando
    }
  }

  guardar(): void {
    this.enviado = true;
    if (this.formularioDetalle.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregar();
    } else {
      this.editar(this.id);
    }
  }

  editar(idDetalle: number): void {
    const detalle = { ...this.formularioDetalle.value, id: idDetalle };
    this.detalleService.actualizarDetalle(detalle).subscribe(response => {
      this.router.navigate(['dashboard-detalles']);
    }, error => {
      console.error('Error al actualizar el detalle:', error);
    });
  }
  
  agregar(): void {
    const detalle = this.formularioDetalle.value;
    this.detalleService.crearDetalleComoAdmin(detalle).subscribe(response => {
      this.router.navigate(['dashboard-detalles']);
    }, error => {
      console.error('Error al agregar el detalle:', error);
    });
  }
}
