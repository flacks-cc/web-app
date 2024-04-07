import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  formularioUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.formularioUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: [''],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)]],
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}

  registrarNuevoUsuario(): void {
    if (this.formularioUsuario.invalid) {
      console.error('Formulario inválido');
      return;
    }
  
    this.usuarioService.register(this.formularioUsuario.value).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente:', response);
        // Mostrar alerta de registro exitoso
        window.alert('¡Registro exitoso! Por favor inicia sesión con tus credenciales.');
        // Redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
      }
    );
  }
}  
