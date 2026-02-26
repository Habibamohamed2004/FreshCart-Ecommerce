import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroment/enviroment';
import { ShippingaddressData } from '../../../shared/models/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpClient:HttpClient=inject(HttpClient);
  createCashOrder(cartId:string,data:ShippingaddressData):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/orders/${cartId}`,
      {
        shippingAddress: data
      }
    )
  }
  checkOut(cartId:string,data:ShippingaddressData):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${enviroment.domain}`,
      {
        shippingAddress: data
      }
    )
  }
}
