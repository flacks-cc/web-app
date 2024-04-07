import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-productos',
  templateUrl: './dashboard-productos.component.html',
  styleUrls: ['./dashboard-productos.component.css']
})
export class DashboardProductosComponent implements OnInit {

  popupEliminarVisible: boolean = false;
  productos: any[] = [];
  indiceProductoAEliminar: number = -1;

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productoService.obtenerLista().subscribe(
      (response) => {
        this.productos = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  mostrarId(id: number) {
    console.log('Se ha hecho clic en el botón "Actualizar producto"');
    console.log('El id del producto seleccionado es:', id);
  }

  eliminar(producto: any): void {
    console.log("Producto a eliminar:", producto);
    const idProducto: number = producto.id;
    if (!isNaN(idProducto)) {
      this.productoService.eliminarProducto(idProducto).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          if (response.deleted === true) {
            this.productos.splice(this.indiceProductoAEliminar, 1);
          }
          this.cerrarEliminarPopup();
          this.loadProductos();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("ID de producto no válido:", producto.id);
    }
  }

  abrirEliminarPopup(indice: number): void {
    console.log('Se hizo clic en el ícono de eliminación en la fila número:', indice);
    console.log("Abrir popup para eliminar. Índice:", indice);
    this.popupEliminarVisible = true;
    this.indiceProductoAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceProductoAEliminar = -1;
  }
}
