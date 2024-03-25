import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';

@Component({
  selector: 'app-crud-clientes',
  templateUrl: './crud-clientes.component.html',
  styleUrls: ['./crud-clientes.component.css']
})
export class CrudClientesComponent implements OnInit {

  titulo = 'Agregar cliente';
  submitted = false;
  formCliente: FormGroup;
  idCliente: any | null;

  constructor(public fb: FormBuilder,
              public clienteService: ClienteService,
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.formCliente = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[A-Za-zÁ-Úá-ú ]+')]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern('[A-Za-zÁ-Úá-ú]+')]],
      apellidoMaterno: ['', Validators.pattern('[A-Za-zÁ-Úá-ú]+')],
      nombreUsuario: ['', Validators.required]
    });
    this.idCliente = this.aRoute.snapshot.paramMap.get('idCliente');
  }


  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.idCliente !== null) {
      this.titulo = 'Editar cliente';
      this.clienteService.getClient(this.idCliente).subscribe(response => {

        this.formCliente.setValue({
          nombre: response.nombre,
          apellidoPaterno: response.apellidoPaterno,
          apellidoMaterno: response.apellidoMaterno,
          nombreUsuario: response.nombreUsuario
        });
      });
    }
  }

  editar(idCliente: any): void {
    const cliente: any = {
      nombre: this.formCliente.value.nombre,
      apellidoPaterno: this.formCliente.value.apellidoPaterno,
      apellidoMaterno: this.formCliente.value.apellidoMaterno,
      nombreUsuario: this.formCliente.value.nombreUsuario
    };

    this.clienteService.updateClient(idCliente, cliente).subscribe(response => {
      this.router.navigate(['dashboard-clientes']);
    },
      error => {
        console.error(error);
      }
    );
  }

  agregar(): void {
    this.clienteService.createClient(this.formCliente.value).subscribe(response => {
      this.router.navigate(['dashboard-clientes']);
    },
      error => {
        console.error(error);
      }
    );
  }

  agregarOEditar(): void {
    
    // Marcar todos los controles como "touched" para que las validaciones se activen
    this.formCliente.markAllAsTouched();

    // Valida que todos los campos del formulario sean correctos
    this.submitted = true;
    if (this.formCliente.invalid) {
      return;
    }
    
    if (this.idCliente === null)
      this.agregar();
    else
      this.editar(this.idCliente);
  }

}