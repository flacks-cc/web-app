import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private URL = "http://localhost:8080/api/servicios";

  constructor(private httpClient: HttpClient) { }

  public createService(service: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/create`, service);
  }

  public getAllServices(): Observable<any> {
    return this.httpClient.get(`${this.URL}/lista`);
  }

  public getService(idServicio: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detail/${idServicio}`);
  }

  public obtenerServicioPorNombre(nombre: string): Observable<any> {
    return this.httpClient.get(`${this.URL}/detailname/${nombre}`);
  }  

  public updateService(idServicio: number, service: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/update/${idServicio}`, service);
  }

  public deleteService(idServicio: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/delete/${idServicio}`);
  }
  
}
