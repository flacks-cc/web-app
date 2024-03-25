import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  private URL = "http://localhost:8080/apiP/reservaciones";

  constructor(private httpClient: HttpClient) { }

  public getAllReservations(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public getReservation(idReservacion: any): Observable<any> {
    return this.httpClient.get(this.URL + "/" + idReservacion);
  }

  public createReservation(reservation: any): Observable<any> {
    return this.httpClient.post(this.URL, reservation);
  }

  public deleteReservation(idReservacion: any): Observable<any> {
    return this.httpClient.delete(this.URL + "/" + idReservacion);
  }

  public updateReservation(idReservacion: any, reservation: any) {
    return this.httpClient.put(this.URL + "/" + idReservacion, reservation);
  }

  public guardarFecha(reservation: any): Observable<any> {
    return this.httpClient.post(this.URL, reservation);
  }
}
