import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/Iproduct';
import { ProductService } from './../../services/product/product.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipes/onsale/onsale-pipe';
import { CartService } from './../../../features/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productdetails',
  imports: [CurrencyPipe,DatePipe,OnsalePipe],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit{
  date = new Date();
  product:WritableSignal<Product>=signal<Product>({} as Product);
  cartService:CartService=inject(CartService);
  toastr = inject(ToastrService);
  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data)=>{
      console.log(data['id']);
      this.getSpecificProduct(data['id']);
    })
    
   
  }
  getSpecificProduct(id:string){
    this.productService.getSpecificProduct(id).subscribe((res)=>{
      this.product.set(res.data);
      console.log(this.product());
      
    })
  }

  addProductToCart(productId:string){
    this.cartService.addProductToCart(productId).subscribe((res)=>{
      this.toastr.success(res.message,'',{
        positionClass:'toast-top-left'
      });
      
    })
  }
}
