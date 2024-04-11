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
  submitted = false;
  formProducto: FormGroup;
  idProducto: number | null = null;

  constructor(public fb: FormBuilder,
              public productoService: ProductoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.formProducto = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.idProducto !== null) {
      this.titulo = 'Editar producto';
      this.productoService.getProduct(this.idProducto).subscribe(response => {

        this.formProducto.setValue({
          nombre: response.nombre,
          descripcion: response.descripcion,
          precio: response.precio,
          stock: response.stock
        });
      });
    }
  }

  editar(idProducto: number): void {
    const producto = this.formProducto.value;
    this.productoService.updateProduct(idProducto, producto).subscribe(response => {
      this.router.navigate(['dashboard-productos']);
    }, error => {
      console.error('Error al actualizar el producto:', error);
    });
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
    const producto = this.formProducto.value;
    this.productoService.createProduct(producto).subscribe(response => {
      this.router.navigate(['dashboard-productos']);
    }, error => {
      console.error('Error al agregar el producto:', error);
    });
  }

  agregarOEditar(): void {
    this.submitted = true;
    if (this.formProducto.invalid) {
      return;
    }
    if (this.idProducto === null) {
      this.agregar();
    } else {
      this.editar(this.idProducto);
    }
  }
  
}
