import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {
  constructor(private Titulo: Title){
    Titulo.setTitle("Servicios | Flack's Barber Shop")
  }
}
