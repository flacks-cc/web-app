import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private URL = "http://localhost:8080/producto";

  constructor(private httpClient: HttpClient) { }

  public obtenerLista(): Observable<any> {
    return this.httpClient.get(`${this.URL}/lista`);
  }

  public obtenerDetallePorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detail/${id}`);
  }

  public obtenerDetallePorNombre(nombre: string): Observable<any> {
    return this.httpClient.get(`${this.URL}/detailname/${nombre}`);
  }

  public eliminarProducto(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/delete/${id}`);
  }

  public crearProducto(nuevoProducto: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/create`, nuevoProducto);
  }

  public actualizarProducto(id: number, productoActualizado: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/update/${id}`, productoActualizado);
  }
}
