import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactoService } from 'src/app/servicios/contacto/contacto.service';

@Component({
  selector: 'app-crud-contactos',
  templateUrl: './crud-contactos.component.html',
  styleUrls: ['./crud-contactos.component.css']
})
export class CrudContactosComponent implements OnInit {

  titulo = 'Agregar contacto';
  enviado = false;
  formularioContacto: FormGroup;
  id: number | null = null;

  constructor(
    public fb: FormBuilder,
    public contactoService: ContactoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioContacto = this.fb.group({
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
      adjunto: [''],
      idUsuario: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        const idString: string = params['id']; // Obtener el ID como cadena
        this.id = parseInt(idString, 10); // Convertir la cadena a un entero
        console.log('ID del contacto:', this.id);
        console.log('Se abrió la página para actualizar el contacto con ID:', this.id);
        this.esEditar();
      } else {
        console.log('No se proporcionó ningún ID en los parámetros de la ruta.');
      }
    });
  }
  
  
  
  esEditar(): void {
    if (this.id !== null) {
      this.titulo = 'Editar contacto';
      this.contactoService.obtenerContactoPorId(this.id).subscribe(response => {
        this.formularioContacto.patchValue(response); // Utiliza patchValue para llenar el formulario con los datos del contacto
      });
    }
  }

  guardar(): void {
    this.enviado = true;
    if (this.formularioContacto.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregar();
    } else {
      this.editar();
    }
  }
  
  editar(): void {
    if (this.id === null || this.id === undefined) {
      console.error('ID de contacto no válido:', this.id);
      return;
    }
    
    const contacto = this.formularioContacto.value;
    this.contactoService.actualizarContacto(this.id, contacto).subscribe(
      (response) => {
        console.log('Contacto actualizado correctamente:', response);
        this.router.navigate(['dashboard-contactos']);
      },
      (error) => {
        console.error('Error al actualizar el contacto:', error);
      }
    );
  }
  
  
  agregar(): void {
    const contacto = this.formularioContacto.value;
    this.contactoService.crearContactoComoAdmin(contacto).subscribe(response => {
      this.router.navigate(['dashboard-contactos']);
    }, error => {
      console.error('Error al agregar el contacto:', error);
    });
  }
}
