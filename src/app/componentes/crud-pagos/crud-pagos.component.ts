import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PagoService } from 'src/app/servicios/pagos/pago.service';

@Component({
  selector: 'app-crud-pagos',
  templateUrl: './crud-pagos.component.html',
  styleUrls: ['./crud-pagos.component.css']
})
export class CrudPagosComponent implements OnInit {

  titulo = 'Agregar Método de Pago';
  enviado = false;
  formularioPago: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioPago = this.fb.group({
      metodoNombre: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        console.log('Se abrió la página para actualizar el método de pago con ID:', this.id);
        this.esEditar();
      } else {
        console.log('Se abrió la página para agregar un nuevo método de pago.');
      }
    });
  }

  esEditar(): void {
    if (this.id !== null) {
      this.titulo = 'Editar Método de Pago';
      // Aquí puedes implementar la lógica para obtener los datos del método de pago por su ID y llenar el formulario
    }
  }

  guardar(): void {
    this.enviado = true;
    if (this.formularioPago.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregar();
    } else {
      this.editar(this.id);
    }
  }

  editar(idPago: number): void {
    const pago = this.formularioPago.value;
    this.pagoService.actualizarMetodoPago(idPago, pago).subscribe(response => {
      this.router.navigate(['dashboard-pagos']);
    }, error => {
      console.error('Error al actualizar el método de pago:', error);
    });
  }
  
  agregar(): void {
    const pago = this.formularioPago.value;
    this.pagoService.crearMetodoPago(pago).subscribe(response => {
      this.router.navigate(['dashboard-pagos']);
    }, error => {
      console.error('Error al agregar el método de pago:', error);
    });
  }
}
