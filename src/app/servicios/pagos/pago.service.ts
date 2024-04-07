import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private URL = "http://localhost:8080/metodopago";

  constructor(private httpClient: HttpClient) { }

  public listarMetodosPago(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL}/lista`);
  }

  public obtenerMetodoPagoPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detail/${id}`);
  }

  public crearMetodoPago(nuevoMetodoPago: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/create`, nuevoMetodoPago);
  }

  public actualizarMetodoPago(id: number, metodoPago: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/update/${id}`, metodoPago);
  }

  public borrarMetodoPago(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/delete/${id}`);
  }
}
