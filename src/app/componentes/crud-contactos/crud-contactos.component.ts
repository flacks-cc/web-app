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
    // Lógica para editar un contacto existente
  }

  guardar(): void {
    this.enviado = true;
    if (this.formularioContacto.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregar();
    } else {
      this.editar(this.id);
    }
  }

  editar(idContacto: number): void {
    const contacto = { ...this.formularioContacto.value, id: idContacto };
    this.contactoService.actualizarContacto(contacto).subscribe(response => {
      this.router.navigate(['dashboard-contactos']);
    }, error => {
      console.error('Error al actualizar el contacto:', error);
    });
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
