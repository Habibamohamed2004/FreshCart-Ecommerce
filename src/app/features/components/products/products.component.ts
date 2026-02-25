import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Product } from '../../../shared/models/Iproduct';
import { ProductService } from '../../services/product/product.service';
import { ProductcardComponent } from '../../../shared/components/productcard/productcard.component';
import { FormsModule } from '@angular/forms';
import { SearchproductPipe } from '../../../shared/pipes/searchproduct/searchproduct-pipe';

@Component({
  selector: 'app-products',
  imports: [ProductcardComponent,SearchproductPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit{
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
