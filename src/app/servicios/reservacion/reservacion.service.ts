import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  private URL = "http://localhost:8080/reservaciones";

  constructor(private httpClient: HttpClient) { }

  public listarReservaciones(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL}/lista`);
  }

  public obtenerReservacionPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detalle/${id}`);
  }

  public crearReservacionComoAdmin(reservacion: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/crearadmin`, reservacion);
  }

  public actualizarReservacion(reservacion: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/actualizar/${reservacion.id}`, reservacion);
  }

  public eliminarReservacion(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/eliminar/${id}`);
  }
}
