import { Category } from './../../../shared/models/Iproduct';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private httpClient:HttpClient=inject(HttpClient);
  getAllCategories():Observable<{data:Category[]}>{
    return this.httpClient.get<{data:Category[]}>(`${enviroment.baseUrl}/api/v1/categories`)
  }
  getSpecificCategory(categoryId:string):Observable<{data:Category}>{
    return this.httpClient.get<{data:Category}>(`${enviroment.baseUrl}/api/v1/categories/${categoryId}`)
  }
}
