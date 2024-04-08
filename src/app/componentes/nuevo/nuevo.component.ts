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

  uniqueError: string | null = null;
  submitted = false;
  formUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.formUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-ZÑa-zñáéíóúÁÉÍÓÚüÜ\s\'\-]+$')]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s\'\-]+$')]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s\'\-]+$')]],
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)]]
    });
  }

  ngOnInit(): void { }

  registrarNuevoUsuario(): void {
    if (this.formUsuario.invalid) {
      console.error('Formulario inválido');
      return;
    }

    this.usuarioService.register(this.formUsuario.value).subscribe(
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
