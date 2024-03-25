import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = "http://localhost:8080/apiP/usuarios";

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public getUser(idUsuario: any): Observable<any> {
    return this.httpClient.get(this.URL + "/" + idUsuario);
  }

  public createUser(user: any): Observable<any> {
    return this.httpClient.post(this.URL, user);
  }

  public deleteUser(idUsuario: any): Observable<any> {
    return this.httpClient.delete(this.URL + "/" + idUsuario);
  }

  public updateUser(idUsuario: any, user: any) {
    return this.httpClient.put(this.URL + "/" + idUsuario, user);
  }

}