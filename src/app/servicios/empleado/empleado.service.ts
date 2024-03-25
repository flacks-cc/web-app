import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private URL = "http://localhost:8080/apiP/empleados";

  constructor(private httpClient: HttpClient) { }

  public getAllEmployees(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public getEmployee(idEmpleado: any): Observable<any> {
    return this.httpClient.get(this.URL + "/" + idEmpleado);
  }

  public createEmployee(employee: any): Observable<any> {
    return this.httpClient.post(this.URL, employee);
  }

  public deleteEmployee(idEmpleado: any): Observable<any> {
    return this.httpClient.delete(this.URL + "/" + idEmpleado);
  }

  public updateEmployee(idEmpleado: any, employee: any) {
    return this.httpClient.put(this.URL + "/" + idEmpleado, employee);
  }
}
