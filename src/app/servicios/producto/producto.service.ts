import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private URL = "http://localhost:8080/api/producto";

  constructor(private httpClient: HttpClient) { }

  public createProduct(product: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/create`, product);
  }

  public getAllProducts(): Observable<any> {
    return this.httpClient.get(`${this.URL}/lista`);
  }

  public getProduct(idProducto: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/detail/${idProducto}`);
  }

  public obtenerDetallePorNombre(nombre: string): Observable<any> {
    return this.httpClient.get(`${this.URL}/detailname/${nombre}`);
  }

  public updateProduct(idProducto: number, product: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/update/${idProducto}`, product);
  }

  public deleteProduct(idProducto: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/delete/${idProducto}`);
  }
  
}
