import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

export interface Product { //es buena practica definir las entidades de datos como interfaces ya que reduce el tamaño del codigo ejecutable. 
  //si Produc se define como una clase, el transpilador lo definiría como función o clase y lo incluiría en el código ejecutable. Esto se debe a que JS no soporta Interfaces
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>('/data/products.json');
  }
  getById(id:number): Observable<Product>{
    return this.http.get<Product[]>('/data/products.json').pipe(map(products=><Product>products.find(p=>p.id===id)));
  }
}
