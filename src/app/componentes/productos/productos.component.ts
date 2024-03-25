import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  constructor(private Titulo: Title){
    Titulo.setTitle("Productos | Flack's Barber Shop")
  }
}
