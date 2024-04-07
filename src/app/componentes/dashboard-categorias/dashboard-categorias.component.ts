import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-categorias',
  templateUrl: './dashboard-categorias.component.html',
  styleUrls: ['./dashboard-categorias.component.css']
})
export class DashboardCategoriasComponent implements OnInit {
  popupEliminarVisible: boolean = false;
  categorias: any[] = [];
  indiceCategoriaAEliminar: number = -1;

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.listarCategorias().subscribe(
      (response) => {
        this.categorias = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  mostrarId(id: number) {
    console.log('Se ha hecho clic en el botón "Actualizar categoría"');
    console.log('El id de la categoría seleccionada es:', id);
  }

  eliminar(categoria: any): void {
    console.log("Categoría a eliminar:", categoria);
    const idCategoria: number = categoria.id;
    if (!isNaN(idCategoria)) {
      this.categoriaService.borrarCategoria(idCategoria).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          if (response.deleted === true) {
            this.categorias.splice(this.indiceCategoriaAEliminar, 1);
          }
          this.cerrarEliminarPopup();
          this.loadCategorias();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("ID de categoría no válido:", categoria.id);
    }
  }

  abrirEliminarPopup(indice: number): void {
    console.log('Se hizo clic en el ícono de eliminación en la fila número:', indice);
    console.log("Abrir popup para eliminar. Índice:", indice);
    this.popupEliminarVisible = true;
    this.indiceCategoriaAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceCategoriaAEliminar = -1;
  }
}
