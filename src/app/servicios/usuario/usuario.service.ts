import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.URL}/usuarios`); // Ruta para obtener todos los usuarios
  }

  public getUser(id: any): Observable<any> {
    return this.httpClient.get(`${this.URL}/usuarios/${id}`); // Ruta para obtener un usuario por su ID
  }

  public createUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/nuevo`, user); // Ruta para crear un nuevo usuario
  }

  public deleteUser(id: any): Observable<any> {
    return this.httpClient.delete(`${this.URL}/usuarios/${id}`); // Ruta para eliminar un usuario por su ID
  }

  public updateUser(id: any, user: any) {
    return this.httpClient.put(`${this.URL}/usuarios/${id}`, user); // Ruta para actualizar un usuario por su ID
  }

}