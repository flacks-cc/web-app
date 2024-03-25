import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private URL = "http://localhost:8080/apiP/servicios";

  constructor(private httpClient: HttpClient) { }

  public getAllServices(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public getService(idServicio: any): Observable<any> {
    return this.httpClient.get(this.URL + "/" + idServicio);
  }

  public createService(service: any): Observable<any> {
    return this.httpClient.post(this.URL, service);
  }

  public deleteService(idServicio: any): Observable<any> {
    return this.httpClient.delete(this.URL + "/" + idServicio);
  }

  public updateService(idServicio: any, service: any) {
    return this.httpClient.put(this.URL + "/" + idServicio, service);
  }
}
