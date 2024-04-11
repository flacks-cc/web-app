import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {

  private URL = "http://localhost:8080/api/resenas";

  constructor(private httpClient: HttpClient) { }

  public getAllReviews(): Observable<any> {
    return this.httpClient.get(`${this.URL}/lista`);
  }

  public getReview(idResena: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detalle/${idResena}`);
  }

  public createReview(resena: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/crearadmin`, resena);
  }

  public crearResenaComoUsuario(resena: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/crearusuario`, resena);
  }

  public deleteReview(idResena: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/eliminar/${idResena}`);
  }

  public updateReview(idResena: number, resena: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/update/${idResena}`, resena);
  }

  public obtenerDetalles(idUsuario: number, idProducto: number, idServicio: number): Observable<any> {
    return forkJoin([
      this.httpClient.get(`${this.URL}/usuarios/${idUsuario}`),
      this.httpClient.get(`${this.URL}/productos/${idProducto}`),
      this.httpClient.get(`${this.URL}/servicios/${idServicio}`)
    ]);
  }
}
