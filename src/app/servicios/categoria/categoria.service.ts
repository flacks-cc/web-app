import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private URL = "http://localhost:8080/categoria";

  constructor(private httpClient: HttpClient) { }

  public listarCategorias(): Observable<any> {
    return this.httpClient.get(`${this.URL}/lista`);
  }

  public obtenerCategoriaPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detail/${id}`);
  }

  public crearCategoria(nuevaCategoria: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/create`, nuevaCategoria);
  }

  public actualizarCategoria(id: number, categoria: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/update/${id}`, categoria);
  }

  public borrarCategoria(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/delete/${id}`);
  }
}
