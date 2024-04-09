import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto/producto.service';

@Component({
  selector: 'app-crud-productos',
  templateUrl: './crud-productos.component.html',
  styleUrls: ['./crud-productos.component.css']
})
export class CrudProductosComponent implements OnInit {
  titulo = 'Agregar producto';
  enviado = false;
  formularioProducto: FormGroup;
  id: number | null = null;

  constructor(
    public fb: FormBuilder,
    public productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioProducto = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      cantidadTotal: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      precio: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9]{1,2})?')]], // Corregido el patrón de precio
      idCategoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        console.log('Se abrió la página para actualizar el producto con ID:', this.id);
        this.esEditar();
      } else {
        console.log('Se abrió la página para agregar un nuevo producto.');
      }
    });
  }

  guardar(): void {
    this.enviado = true;
    if (this.formularioProducto.invalid) {
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
      this.titulo = 'Editar producto';
      this.productoService.obtenerDetallePorId(this.id).subscribe(response => {
        this.formularioProducto.patchValue(response); // Utiliza patchValue para llenar el formulario con los datos del producto
      });
    }
  }

  agregar(): void {
    const producto = this.formularioProducto.value;
    this.productoService.crearProducto(producto).subscribe(response => {
      this.router.navigate(['dashboard-productos']);
    }, error => {
      console.error('Error al agregar el producto:', error);
    });
  }

  editar(idProducto: number): void {
    const producto = this.formularioProducto.value;
    this.productoService.actualizarProducto(idProducto, producto).subscribe(response => {
      this.router.navigate(['dashboard-productos']);
    }, error => {
      console.error('Error al actualizar el producto:', error);
    });
  }
}
