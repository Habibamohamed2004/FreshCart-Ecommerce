import { ProductService } from './../../services/product/product.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HomesliderComponent } from './homeslider/homeslider.component';
import { CategorysliderComponent } from '../../../shared/components/categoryslider/categoryslider.component';
import { Product } from '../../../shared/models/Iproduct';
import { ProductcardComponent } from '../../../shared/components/productcard/productcard.component';
import { SearchproductPipe } from '../../../shared/pipes/searchproduct/searchproduct-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [HomesliderComponent,CategorysliderComponent,ProductcardComponent,SearchproductPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userSearch:string='';
  productList:WritableSignal<Product[]>=signal<Product[]>([]);
  productService:ProductService=inject(ProductService);
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(){
    this.productService.getAllProducts().subscribe((res)=>{
      this.productList.set(res.data);
      console.log(this.productList());
    })
  }

}
