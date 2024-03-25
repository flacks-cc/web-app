import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css']
})
export class SobreNosotrosComponent {
  constructor(private Titulo: Title){
    Titulo.setTitle("Sobre nosotros | Flack's Barber Shop")
  }

}
