import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private URL = "http://localhost:8080/servicio";

  constructor(private httpClient: HttpClient) { }

  public listarServicios(): Observable<any> {
    return this.httpClient.get(`${this.URL}/lista`);
  }

  public obtenerServicioPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detail/${id}`);
  }

  public eliminarServicio(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/delete/${id}`);
  }

  public crearServicio(servicio: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/create`, servicio);
  }

  public actualizarServicio(id: number, servicio: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/update/${id}`, servicio);
  }

  public obtenerServicioPorNombre(nombre: string): Observable<any> {
    return this.httpClient.get(`${this.URL}/detailname/${nombre}`);
  }
}
