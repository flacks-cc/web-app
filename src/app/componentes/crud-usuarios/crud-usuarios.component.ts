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
  idUsuario: any | null;

  constructor(public fb: FormBuilder,
              public usuarioService: UsuarioService,
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.formUsuario = this.fb.group({
      nombreUsuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)]]
    });

    this.idUsuario = this.aRoute.snapshot.paramMap.get('idUsuario');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.idUsuario !== null) {
      this.titulo = 'Editar usuario';
      this.usuarioService.getUser(this.idUsuario).subscribe(response => {

        this.formUsuario.setValue({
          nombreUsuario: response.nombreUsuario,
          correo: response.correo,
          contrasena: response.contrasena,
          telefono: response.telefono
        });
      });
    }
  }

  editar(idUsuario: any): void {
    const usuario: any = {
      nombreUsuario: this.formUsuario.value.nombreUsuario,
      correo: this.formUsuario.value.correo,
      contrasena: this.formUsuario.value.contrasena,
      telefono: this.formUsuario.value.telefono
    };

    this.usuarioService.updateUser(idUsuario, usuario).subscribe(response => {
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

    if (this.idUsuario === null)
      this.agregar();
    else
      this.editar(this.idUsuario);
  }
}
