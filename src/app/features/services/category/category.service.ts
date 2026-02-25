import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private httpClient:HttpClient=inject(HttpClient);
  getAllCategories():Observable<any>{
    return this.httpClient.get(`${enviroment.baseUrl}/api/v1/categories`)
  }
}
