import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './../../services/order/order.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-shippingaddress',
  imports: [ReactiveFormsModule],
  templateUrl: './shippingaddress.component.html',
  styleUrl: './shippingaddress.component.scss',
})
export class ShippingaddressComponent {
  orderService:OrderService=inject(OrderService);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  router:Router=inject(Router);
  cartservice:CartService=inject(CartService);
  fb:FormBuilder=inject(FormBuilder);
  shippingAddressForm:FormGroup= this.fb.group({
    details:[null],
    phone:[null],
    city:[null],
  })

  submitShippingAddressFormCash(){
    if(this.shippingAddressForm.valid){
      this.activatedRoute.params.subscribe({
        next:data=>{
          console.log(data['id']);
          this.orderService.createCashOrder(data['id'],this.shippingAddressForm.value).subscribe({
            next:res =>{
              console.log(res);
              this.router.navigate(['allorders']);
              this.cartservice.NoOfcartItems.next(0);
            }
          })
        }
      })
      
    }    
  }

  submitShippingAddressFormOnline(){
    if(this.shippingAddressForm.valid){
      this.activatedRoute.params.subscribe({
        next:data=>{
          console.log(data['id']);
          this.orderService.checkOut(data['id'],this.shippingAddressForm.value).subscribe({
            next:res =>{
              window.open(res.session.url,'_self')
            }
          })
        }
      })
      
    }    
  }
}
