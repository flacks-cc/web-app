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
  submitted = false;
  uniqueError: string | null = null;
  uniqueEmailError: string | null = null;
  formUsuario: FormGroup;
  id: number | null = null;
  uniquePhoneError: string | null = null;
  selectedRoles: string[] = [];

  constructor(
    public fb: FormBuilder,
    public usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-ZÑa-zñáéíóúÁÉÍÓÚüÜ\s\'\-]+$')]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s\'\-]+$')]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s\'\-]+$')]],
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)]],
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
        this.formUsuario.patchValue(response); // Utiliza patchValue para llenar el formulario con los datos del usuario
      });
    }
  }

    
  editar(idUsuario: number): void {
    const usuario = this.formUsuario.value;
    this.usuarioService.actualizarUsuario(idUsuario, usuario).subscribe(response => {
      this.router.navigate(['dashboard-usuarios']);
    }, error => {
      console.error('Error al actualizar el usuario:', error);
    });
  }
  
  agregar(): void {
    this.usuarioService.register(this.formUsuario.value).subscribe(response => {
      this.router.navigate(['dashboard-usuarios']);
    },
      	error => {
        if (error.error.message === 'Correo ya existe') {
          this.uniqueError = 'El correo ingresado ya existe. Por favor, elige otro correo.';
        } else {
          console.error(error);
        }
      }
    );
  }


  agregarOEditar(): void {

    // Marcar todos los controles como "touched" para que las validaciones se activen
    this.formUsuario.markAllAsTouched();

    // Valida que todos los campos del formulario sean correctos
    this.submitted = true;
    if (this.formUsuario.invalid) {
      return;
    }

    if (this.id === null)
      this.agregar();
    else
      this.editar(this.id);
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
