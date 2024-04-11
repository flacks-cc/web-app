import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  private URL = "http://localhost:8080/api/reservaciones";

  constructor(private httpClient: HttpClient) { }

  public getAllReservations(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL}/lista`);
  }

  public getReservation(idReservacion: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detalle/${idReservacion}`);
  }

  public createreservation(reservacion: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/crearadmin`, reservacion);
  }

  public updateReservation(reservacion: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/actualizar/${reservacion.idReservacion}`, reservacion);
  }

  public deleteReservation(idReservacion: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/eliminar/${idReservacion}`);
  }
}
