import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URL = "http://localhost:8080/apiP/clientes";

  constructor(private httpClient: HttpClient) { }

  public getAllClients(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public getClient(idCliente: any): Observable<any> {
    return this.httpClient.get(this.URL + "/" + idCliente);
  }

  public createClient(client: any): Observable<any> {
    return this.httpClient.post(this.URL, client);
  }

  public deleteClient(idCliente: any): Observable<any> {
    return this.httpClient.delete(this.URL + "/" + idCliente);
  }

  public updateClient(idCliente: any, client: any) {
    return this.httpClient.put(this.URL + "/" + idCliente, client);
  }

}
