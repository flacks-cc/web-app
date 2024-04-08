import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-usuarios',
  templateUrl: './dashboard-usuarios.component.html',
  styleUrls: ['./dashboard-usuarios.component.css']
})
export class DashboardUsuariosComponent implements OnInit {

  popupEliminarVisible: boolean = false;
  usuarios: any[] = [];
  indiceUsuarioAEliminar: number = -1;

  //Objeto que mapea los nombres de los roles
  nombresRoles: { [key: string]: string } = {
    'ROLE_ADMIN': 'Admin',
    'ROLE_USER': 'Usuario'
  };

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(
      (response) => {
        this.usuarios = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  mostrarId(id: number) {
    console.log('Se ha hecho clic en el botón "Actualizar usuario"');
    console.log('El id del usuario seleccionado es:', id);
  }

  // Método para mostrar los roles de los usuarios
  getNombresRoles(roles: any[]): string {
    return roles.map(rol => this.nombresRoles[rol.rolNombre] || rol.rolNombre).join(', ');
  }


  eliminar(usuario: any): void {
    console.log("Usuario a eliminar:", usuario);
    const idUsuario: number = usuario.id;
    if (!isNaN(idUsuario)) {
      this.usuarioService.borrarUsuario(idUsuario).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
          if (response.deleted === true) {
            this.usuarios.splice(this.indiceUsuarioAEliminar, 1);
          }
          this.cerrarEliminarPopup();
          this.loadUsuarios();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("ID de usuario no válido:", usuario.id);
    }
  }

  abrirEliminarPopup(indice: number): void {
    console.log('Se hizo clic en el ícono de eliminación en la fila número:', indice);
    console.log("Abrir popup para eliminar. Índice:", indice);
    this.popupEliminarVisible = true;
    this.indiceUsuarioAEliminar = indice;
  }

  cerrarEliminarPopup(): void {
    this.popupEliminarVisible = false;
    this.indiceUsuarioAEliminar = -1;
  }
}
