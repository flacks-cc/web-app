import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  private URL = "http://localhost:8080/detallegeneral";

  constructor(private httpClient: HttpClient) { }

  public listarDetalles(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL}/lista`);
  }

  public obtenerDetallePorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detalle/${id}`);
  }

  public crearDetalleComoAdmin(detalle: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/creardetalleadmin`, detalle);
  }

  public actualizarDetalle(detalle: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/actualizardetalle/${detalle.id}`, detalle);
  }

  public eliminarDetalle(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/eliminarDetalle/${id}`);
  }
}
