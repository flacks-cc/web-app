import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formUsuario: FormGroup;
  id: any | null;

  constructor(public fb: FormBuilder,
    public usuarioService: UsuarioService,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.formUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-ZÑa-zñáéíóúÁÉÍÓÚüÜ\s\'\-]+$')]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s\'\-]+$')]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s\'\-]+$')]],
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)]]
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar usuario';
      this.usuarioService.getUser(this.id).subscribe(response => {

        this.formUsuario.setValue({
          nombre: response.nombre,
          apellidoPaterno: response.apellidoPaterno,
          apellidoMaterno: response.apellidoMaterno,
          nombreUsuario: response.nombreUsuario,
          email: response.email,
          password: response.password,
          telefono: response.telefono        
        });
      });
    }
  }

  editar(id: any): void {
    const usuario: any = {
      nombre: this.formUsuario.value.nombre,
      apellidoPaterno: this.formUsuario.value.apellidoPaterno,
      apellidoMaterno: this.formUsuario.value.apellidoMaterno,
      nombreUsuario: this.formUsuario.value.nombreUsuario,
      email: this.formUsuario.value.email,
      password: this.formUsuario.value.password,
      telefono: this.formUsuario.value.telefono
    };

    this.usuarioService.updateUser(id, usuario).subscribe(response => {
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

  agregar(): void {
    this.usuarioService.createUser(this.formUsuario.value).subscribe(response => {
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
}
