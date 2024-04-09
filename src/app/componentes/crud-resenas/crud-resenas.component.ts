import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResenaService } from 'src/app/servicios/resena/resena.service';

@Component({
  selector: 'app-crud-resenas',
  templateUrl: './crud-resenas.component.html',
  styleUrls: ['./crud-resenas.component.css']
})
export class CrudResenasComponent implements OnInit {

  titulo = 'Agregar reseña';
  enviado = false;
  formularioResena: FormGroup;
  id: number | null = null;

  constructor(
    public fb: FormBuilder,
    public resenaService: ResenaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioResena = this.fb.group({
      mensaje: ['', Validators.required],
      valoracion: ['', [Validators.required, Validators.min(1), Validators.max(5)]], // Añadida validación para valoración entre 1 y 5
      idUsuario: ['', Validators.required],
      idServicio: ['', Validators.required],
      idProducto: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        console.log('Se abrió la página para actualizar la reseña con ID:', this.id);
        this.esEditar();
      } else {
        console.log('Se abrió la página para agregar una nueva reseña.');
      }
    });
  }

  guardar(): void {
    this.enviado = true;
    if (this.formularioResena.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregar();
    } else {
      this.editar(this.id);
    }
  }

  esEditar(): void {
    if (this.id !== null) {
      this.titulo = 'Editar reseña';
      this.resenaService.obtenerResenaPorId(this.id).subscribe(response => {
        this.formularioResena.patchValue(response); 
      });
    }
  }

  editar(idResena: number): void {
    const resena = this.formularioResena.value;
    this.resenaService.actualizarResena(idResena, resena).subscribe(response => {
      this.router.navigate(['dashboard-resenas']);
    }, error => {
      console.error('Error al actualizar la reseña:', error);
    });
  }
  
  agregar(): void {
    const resena = this.formularioResena.value;
    this.resenaService.crearResenaComoAdmin(resena).subscribe(response => {
      this.router.navigate(['dashboard-resenas']);
    }, error => {
      console.error('Error al agregar la reseña:', error);
    });
  }
}
