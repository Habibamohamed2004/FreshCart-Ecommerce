import { Product } from './../../../shared/models/Iproduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { AllProductsResponse } from '../../../shared/models/Iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient:HttpClient){}
  getAllProducts():Observable<AllProductsResponse>{
    return this.httpClient.get<AllProductsResponse>(`${enviroment.baseUrl}/api/v1/products`)
  }
  getSpecificProduct(productId:string):Observable<{data:Product}>{
    return this.httpClient.get<{data:Product}>(`${enviroment.baseUrl}/api/v1/products/${productId}`)
  }
}
