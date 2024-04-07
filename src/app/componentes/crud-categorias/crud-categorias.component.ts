import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';

@Component({
  selector: 'app-crud-categorias',
  templateUrl: './crud-categorias.component.html',
  styleUrls: ['./crud-categorias.component.css']
})
export class CrudCategoriasComponent implements OnInit {


  titulo = 'Agregar categoría';
  enviado = false;
  formularioCategoria: FormGroup;
  id: number | null = null;

  constructor(
    public fb: FormBuilder,
    public categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioCategoria = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        console.log('Se abrió la página para actualizar la categoría con ID:', this.id);
        this.esEditar();
      } else {
        console.log('Se abrió la página para agregar una nueva categoría.');
      }
    });
  }

  esEditar(): void {
    if (this.id !== null) {
      this.titulo = 'Editar categoría';
      this.categoriaService.obtenerCategoriaPorId(this.id).subscribe(response => {
        this.formularioCategoria.patchValue(response); // Utiliza patchValue para llenar el formulario con los datos de la categoría
      });
    }
  }

  guardar(): void {
    this.enviado = true;
    if (this.formularioCategoria.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregar();
    } else {
      this.editar(this.id);
    }
  }

  editar(idCategoria: number): void {
    const categoria = this.formularioCategoria.value;
    this.categoriaService.actualizarCategoria(idCategoria, categoria).subscribe(response => {
      this.router.navigate(['dashboard-categorias']);
    }, error => {
      console.error('Error al actualizar la categoría:', error);
    });
  }
  
  agregar(): void {
    const categoria = this.formularioCategoria.value;
    this.categoriaService.crearCategoria(categoria).subscribe(response => {
      this.router.navigate(['dashboard-categorias']);
    }, error => {
      console.error('Error al agregar la categoría:', error);
    });
  }
}
