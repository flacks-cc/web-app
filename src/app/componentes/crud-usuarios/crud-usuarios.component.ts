import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.css']
})
export class CrudUsuariosComponent implements OnInit {

  titulo = 'Agregar usuario';
  enviado = false;
  uniqueEmailError: string | null = null;
  formularioUsuario: FormGroup;
  id: number | null = null;
  uniquePhoneError: string | null = null;
  selectedRoles: string[] = [];

  constructor(
    public fb: FormBuilder,
    public usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: [''],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)]],
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: [[], [Validators.required, this.rolesSeleccionadosValidator]] // Agregamos la validación personalizada
    });
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        console.log('Se abrió la página para actualizar el usuario con ID:', this.id);
        this.esEditar();
      } else {
        console.log('Se abrió la página para agregar un nuevo usuario.');
      }
    });
  }

    // Función para validar si se han seleccionado roles
    rolesSeleccionadosValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const roles = control.value;
      if (roles && roles.length > 0) {
        return null; // Retorna null si al menos un rol está seleccionado
      } else {
        return { 'noRolesSeleccionados': true }; // Retorna un error si no se ha seleccionado ningún rol
      }
    }
  

  esEditar(): void {
    if (this.id !== null) {
      this.titulo = 'Editar usuario';
      this.usuarioService.obtenerUsuarioPorId(this.id).subscribe(response => {
        this.formularioUsuario.patchValue(response); // Utiliza patchValue para llenar el formulario con los datos del usuario
      });
    }
  }

  guardar(): void {
    this.enviado = true;
    if (this.formularioUsuario.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregar();
    } else {
      this.editar(this.id);
    }
}

  
  editar(idUsuario: number): void {
    const usuario = this.formularioUsuario.value;
    this.usuarioService.actualizarUsuario(idUsuario, usuario).subscribe(response => {
      this.router.navigate(['dashboard-usuarios']);
    }, error => {
      console.error('Error al actualizar el usuario:', error);
    });
  }
  
  agregar(): void {
    const usuario = this.formularioUsuario.value;
    this.usuarioService.register(usuario).subscribe(response => {
      this.router.navigate(['dashboard-usuarios']);
    }, error => {
      console.error('Error al agregar el usuario:', error);
    });
  }
  
  private handleErrors(error: any): void {
    if (error.error.message === 'Correo ya existe') {
      this.uniqueEmailError = 'El correo ingresado ya existe. Por favor, elige otro correo.';
    } else if (error.error.message === 'Teléfono ya existe') {
      this.uniquePhoneError = 'El teléfono ingresado ya existe. Por favor, elige otro teléfono.';
    } else {
      console.error(error);
    }
  }
}
