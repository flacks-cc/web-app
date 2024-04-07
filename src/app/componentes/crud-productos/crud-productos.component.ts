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
      precio: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      idCategoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Lógica para verificar si se está editando un producto y cargar sus datos si es así
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
