import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { noNegativos, noDecimales, noCero } from 'src/app/validaciones/validaciones';

@Component({
  selector: 'app-crud-productos',
  templateUrl: './crud-productos.component.html',
  styleUrls: ['./crud-productos.component.css']
})
export class CrudProductosComponent implements OnInit {

  titulo = 'Agregar producto';
  submitted = false;
  formProducto: FormGroup;
  idProducto: any | null;

  constructor(public fb: FormBuilder,
              public productoService: ProductoService,
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.formProducto = this.fb.group({
      nombreProducto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, noNegativos, noDecimales, noCero]],
      stock: ['', [Validators.required, noNegativos, noDecimales]]
    });

    this.idProducto = this.aRoute.snapshot.paramMap.get('idProducto');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.idProducto !== null) {
      this.titulo = 'Editar producto';
      this.productoService.getProduct(this.idProducto).subscribe(response => {

        this.formProducto.setValue({
          nombreProducto: response.nombreProducto,
          descripcion: response.descripcion,
          precio: response.precio,
          stock: response.stock
        });
      });
    }
  }

  editar(idProducto: any): void {
    const producto: any = {
      nombreProducto: this.formProducto.value.nombreProducto,
      descripcion: this.formProducto.value.descripcion,
      precio: this.formProducto.value.precio,
      stock: this.formProducto.value.stock
    };

    this.productoService.updateProduct(idProducto, producto).subscribe(response => {
      this.router.navigate(['dashboard-productos']);
    },
      error => {
        console.error(error);
      }
    );
  }

  agregar(): void {
    this.productoService.createProduct(this.formProducto.value).subscribe(response => {
      this.router.navigate(['dashboard-productos']);
    },
      error => {
        console.error(error);
      }
    );
  }

  agregarOEditar(): void {

    // Marcar todos los controles como "touched" para que las validaciones se activen
    this.formProducto.markAllAsTouched();

    // Valida que todos los campos del formulario sean correctos
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
