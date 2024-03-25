import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/servicios/empleado/empleado.service';
import { noCero, noDecimales, noNegativos } from 'src/app/validaciones/validaciones';

@Component({
  selector: 'app-crud-empleados',
  templateUrl: './crud-empleados.component.html',
  styleUrls: ['./crud-empleados.component.css']
})
export class CrudEmpleadosComponent implements OnInit {

  titulo = 'Agregar empleado';
  submitted = false;
  formEmpleado: FormGroup;
  idEmpleado: any | null;

  constructor(public fb: FormBuilder,
              public empleadoService: EmpleadoService,
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.formEmpleado = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[A-Za-zÁ-Úá-ú ]+')]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern('[A-Za-zÁ-Úá-ú]+')]],
      apellidoMaterno: ['', Validators.pattern('[A-Za-zÁ-Úá-ú]+')],
      nombreUsuario: ['', Validators.required],
      salario: ['', [Validators.required, noNegativos, noDecimales, noCero]]
    });

    this.idEmpleado = this.aRoute.snapshot.paramMap.get('idEmpleado');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.idEmpleado !== null) {
      this.titulo = 'Editar empleado';
      this.empleadoService.getEmployee(this.idEmpleado).subscribe(response => {

        this.formEmpleado.setValue({
          nombre: response.nombre,
          apellidoPaterno: response.apellidoPaterno,
          apellidoMaterno: response.apellidoMaterno,
          nombreUsuario: response.nombreUsuario,
          salario: response.salario
        });
      });
    }
  }

  editar(idEmpleado: any): void {
    const empleado: any = {
      nombre: this.formEmpleado.value.nombre,
      apellidoPaterno: this.formEmpleado.value.apellidoPaterno,
      apellidoMaterno: this.formEmpleado.value.apellidoMaterno,
      nombreUsuario: this.formEmpleado.value.nombreUsuario,
      salario: this.formEmpleado.value.salario
    };

    this.empleadoService.updateEmployee(idEmpleado, empleado).subscribe(response => {
      this.router.navigate(['dashboard-empleados']);
    },
      error => {
        console.error(error);
      }
    );
  }

  agregar(): void {
    this.empleadoService.createEmployee(this.formEmpleado.value).subscribe(response => {
      this.router.navigate(['dashboard-empleados']);
    },
      error => {
        console.error(error);
      }
    );
  }

  agregarOEditar(): void {

    // Marcar todos los controles como "touched" para que las validaciones se activen
    this.formEmpleado.markAllAsTouched();

    // Valida que todos los campos del formulario sean correctos
    this.submitted = true;
    if (this.formEmpleado.invalid) {
      return;
    }
    
    if (this.idEmpleado === null)
      this.agregar();
    else
      this.editar(this.idEmpleado);
  }
}
