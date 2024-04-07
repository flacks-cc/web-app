import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {

  private URL = "http://localhost:8080/resenas";

  constructor(private httpClient: HttpClient) { }

  public listarResenas(): Observable<any> {
    return this.httpClient.get(`${this.URL}/lista`);
  }

  public obtenerResenaPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detalle/${id}`);
  }

  public crearResenaComoAdmin(resena: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/crearadmin`, resena);
  }

  public crearResenaComoUsuario(resena: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/crearusuario`, resena);
  }

  public eliminarResena(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/eliminar/${id}`);
  }

  public actualizarResena(id: number, resena: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/update/${id}`, resena);
  }

  public obtenerDetalles(idUsuario: number, idProducto: number, idServicio: number): Observable<any> {
    return forkJoin([
      this.httpClient.get(`${this.URL}/usuarios/${idUsuario}`),
      this.httpClient.get(`${this.URL}/productos/${idProducto}`),
      this.httpClient.get(`${this.URL}/servicios/${idServicio}`)
    ]);
  }
}
