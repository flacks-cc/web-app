import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(private Titulo: Title){
    Titulo.setTitle("Inicio | Flack's Barber Shop")
  }
}
