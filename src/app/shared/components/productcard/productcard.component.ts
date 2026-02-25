import { CartService } from './../../../features/services/cart/cart.service';
import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/Iproduct';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productcard',
  imports: [RouterLink],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.scss',
})
export class ProductcardComponent {
  product=input<Product>({} as Product);
  cartService:CartService=inject(CartService);
  toastr = inject(ToastrService);

  addProductToCart(productId:string){
    this.cartService.addProductToCart(productId).subscribe((res)=>{
      this.toastr.success(res.message,'',{
        positionClass:'toast-top-left'
      });
      this.cartService.NoOfcartItems.next(res.numOfCartItems)
    })
  }
}