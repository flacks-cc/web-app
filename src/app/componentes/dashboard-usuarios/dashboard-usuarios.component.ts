import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-dashboard-usuarios',
  templateUrl: './dashboard-usuarios.component.html',
  styleUrls: ['./dashboard-usuarios.component.css']
})
export class DashboardUsuariosComponent implements OnInit {

  popupEliminarVisible: boolean = false;
  usuarios: any;
  indiceUsuarioAEliminar: number = -1;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getAllUsers().subscribe(response => {
      this.usuarios = response;
    },
      error => {
        console.error(error);
      });
  }

  eliminar(usuario: any): void {
    this.usuarioService.deleteUser(usuario.id).subscribe(response => {
      if (response.deleted === true) {
        this.usuarios.splice(this.indiceUsuarioAEliminar, 1);
      }
      this.cerrarEliminarPopup();

      this.usuarioService.getAllUsers().subscribe(response => {
        this.usuarios = response;
      });
    });
  }

  abrirEliminarPopup(indice: number): void {
    this.popupEliminarVisible = true;
    this.indiceUsuarioAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceUsuarioAEliminar = -1;
  }
}
