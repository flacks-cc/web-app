import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResenaService } from 'src/app/servicios/resena/resena.service';

@Component({
  selector: 'app-crud-resenas',
  templateUrl: './crud-resenas.component.html',
  styleUrls: ['./crud-resenas.component.css']
})
export class CrudResenasComponent implements OnInit {

  titulo = 'Agregar reseña';
  enviado = false;
  formularioResena: FormGroup;
  id: number | null = null;

  constructor(
    public fb: FormBuilder,
    public resenaService: ResenaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioResena = this.fb.group({
      mensaje: ['', Validators.required],
      valoracion: ['', Validators.required],
      idUsuario: ['', Validators.required],
      idServicio: ['', Validators.required],
      idProducto: ['', Validators.required]
      // Aquí podrías agregar más campos según tus necesidades y aplicar las validaciones correspondientes
    });
  }
  
  ngOnInit(): void {
    // Aquí podrías incluir la lógica para editar una reseña si se proporciona un ID en la URL
  }

  guardar(): void {
    this.enviado = true;
    if (this.formularioResena.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregar();
    } else {
      this.editar(this.id);
    }
  }

  editar(idResena: number): void {
    const resena = this.formularioResena.value;
    this.resenaService.actualizarResena(idResena, resena).subscribe(response => {
      this.router.navigate(['dashboard-resenas']);
    }, error => {
      console.error('Error al actualizar la reseña:', error);
    });
  }
  
  agregar(): void {
    const resena = this.formularioResena.value;
    this.resenaService.crearResenaComoAdmin(resena).subscribe(response => {
      this.router.navigate(['dashboard-resenas']);
    }, error => {
      console.error('Error al agregar la reseña:', error);
    });
  }
}
