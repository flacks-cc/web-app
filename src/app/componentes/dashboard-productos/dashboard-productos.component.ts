import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto/producto.service';

@Component({
  selector: 'app-dashboard-productos',
  templateUrl: './dashboard-productos.component.html',
  styleUrls: ['./dashboard-productos.component.css']
})
export class DashboardProductosComponent implements OnInit {

  popupEliminarVisible: boolean = false;
  productos: any;
  indiceProductoAEliminar: number = -1;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getAllProducts().subscribe(response => {
      this.productos = response;
    },
      error => {
        console.error(error);
      });
  }

  eliminar(producto: any) {
    this.productoService.deleteProduct(producto.idProducto).subscribe(response => {
      if (response.deleted == true) {
        this.productos.splice(this.indiceProductoAEliminar, 1);
      }
      this.cerrarEliminarPopup();

      this.productoService.getAllProducts().subscribe(response => {
      this.productos = response;
    });
    });
  }

  abrirEliminarPopup(indice: number): void {
    this.popupEliminarVisible = true;
    this.indiceProductoAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceProductoAEliminar = -1;
  }
}
