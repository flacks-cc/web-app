import { Component, OnInit } from '@angular/core';
import { ResenaService } from 'src/app/servicios/resena/resena.service';

@Component({
  selector: 'app-dashboard-resenas',
  templateUrl: './dashboard-resenas.component.html',
  styleUrls: ['./dashboard-resenas.component.css']
})
export class DashboardResenasComponent implements OnInit {

  resenas: any[] = [];
  popupEliminarVisible: boolean = false;
  indiceResenaAEliminar: number = -1;

  constructor(private resenaService: ResenaService) { }

  ngOnInit(): void {
    this.loadResenas();
  }

  loadResenas(): void {
    this.resenaService.listarResenas().subscribe(
      (response) => {
        this.resenas = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminar(resena: any): void {
    const idResena: number = resena.id;
    if (!isNaN(idResena)) {
      this.resenaService.eliminarResena(idResena).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          if (response.deleted === true) {
            this.resenas.splice(this.indiceResenaAEliminar, 1);
          }
          this.cerrarEliminarPopup();
          this.loadResenas();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("ID de reseña no válido:", resena.id);
    }
  }

  abrirEliminarPopup(indice: number): void {
    this.popupEliminarVisible = true;
    this.indiceResenaAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceResenaAEliminar = -1;
  }

}
