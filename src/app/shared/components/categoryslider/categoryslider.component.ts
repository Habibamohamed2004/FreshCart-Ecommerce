import { Category } from '../../models/Iproduct';
import { CategoryService } from './../../../features/services/category/category.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-categoryslider',
  imports: [CarouselModule],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.scss',
})
export class CategorysliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    rtl:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      }
    },
    nav: false
  }
  categoryList:WritableSignal<Category[]>=signal<Category[]>([]);
  private categoryService:CategoryService=inject(CategoryService);
  ngOnInit():void{
    this.getAllCategories();
  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((res)=>{
      this.categoryList.set(res.data);
      console.log(this.categoryList);
      
    })
  }
}
