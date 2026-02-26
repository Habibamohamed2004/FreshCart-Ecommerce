import { Brand } from './../../../shared/models/Iproduct';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  httpClient:HttpClient=inject(HttpClient);
  getAllBrands():Observable<{data:Brand[]}>{
    return this.httpClient.get<{data:Brand[]}>(`${enviroment.baseUrl}/api/v1/brands`);
  }
  getSpecificBrand(brandId:string):Observable<{data:Brand}>{
    return this.httpClient.get<{data:Brand}>(`${enviroment.baseUrl}/api/v1/brands/${brandId}`);
  }
}
