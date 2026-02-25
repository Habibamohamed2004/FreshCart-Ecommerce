import { CheckPlatFormService } from './../../../shared/services/checkPlatForm/check-plat-form.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroment/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartResponse } from '../../../shared/models/ICart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  checkPlatFormService:CheckPlatFormService=inject(CheckPlatFormService);
  NoOfcartItems:BehaviorSubject<number>=new BehaviorSubject<number>(0);
  httpClient:HttpClient=inject(HttpClient);
  constructor(){
    if(this.checkPlatFormService.CheckIsPlatFormBrowser()){
      this.getLoggedUserCart().subscribe({
        next:res=>{
          this.NoOfcartItems.next(res.numOfCartItems);
          console.log(this.NoOfcartItems.getValue());
          
        }
      })
    }
    
  }
  addProductToCart(productId:string):Observable<any>{
   return this.httpClient.post(`${enviroment.baseUrl}/api/v1/cart`,{
      productId:productId
    })
  }

  getLoggedUserCart():Observable<CartResponse>{
    return this.httpClient.get<CartResponse>(`${enviroment.baseUrl}/api/v1/cart`)
  }

  updateProductCartCount(productId:string,count:string):Observable<CartResponse>{
    return this.httpClient.put<CartResponse>(`${enviroment.baseUrl}/api/v1/cart/${productId}`,
      {
        count
      }
    )
  }

  removeSpecificProductFromCart(productId:string):Observable<CartResponse>{
    return this.httpClient.delete<CartResponse>(`${enviroment.baseUrl}/api/v1/cart/${productId}`)
  }

  clearCart():Observable<any>{
    return this.httpClient.delete(`${enviroment.baseUrl}/api/v1/cart`)
  }

}
