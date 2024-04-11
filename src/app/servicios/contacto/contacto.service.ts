import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private URL = "http://localhost:8080/contactos";

  constructor(private httpClient: HttpClient) { }

  public listarContactos(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL}/lista`);
  }

  public obtenerContactoPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detalle/${id}`);
  }

  public crearContactoComoAdmin(contacto: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/crearadmin`, contacto);
  }

  public actualizarContacto(id: number, contacto: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/actualizar/${id}`, contacto);
  }  
  
  public eliminarContacto(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/eliminar/${id}`);
  }
}
