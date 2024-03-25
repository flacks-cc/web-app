import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private URL = "http://localhost:8080/apiP/productos";

  constructor(private httpClient: HttpClient) { }

  public getAllProducts(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public getProduct(idProducto: any): Observable<any> {
    return this.httpClient.get(this.URL + "/" + idProducto);
  }

  public createProduct(product: any): Observable<any> {
    return this.httpClient.post(this.URL, product);
  }

  public deleteProduct(idProducto: any): Observable<any> {
    return this.httpClient.delete(this.URL + "/" + idProducto);
  }

  public updateProduct(idProducto: any, product: any) {
    return this.httpClient.put(this.URL + "/" + idProducto, product);
  }
}