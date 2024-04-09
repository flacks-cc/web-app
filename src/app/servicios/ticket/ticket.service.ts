import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private URL = "http://localhost:8080/tickets";

  constructor(private httpClient: HttpClient) { }

 public listarTickets(): Observable<any> {
    return this.httpClient.get(`${this.URL}/lista`);
  }

  public obtenerTicketPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/${id}`);
  }

  public crearTicket(nuevoTicket: any): Observable<any> {
    return this.httpClient.post(this.URL, nuevoTicket);
  }

  public actualizarTicket(id: number, ticket: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/${id}`, ticket);
  }

  public borrarTicket(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/${id}`);
  }
}
