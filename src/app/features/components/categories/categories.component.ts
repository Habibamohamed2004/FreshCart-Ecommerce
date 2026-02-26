import { NgFor, NgIf } from '@angular/common';
import { Category } from '../../../shared/models/Iproduct';
import { CategoryService } from './../../services/category/category.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [NgFor, NgIf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categoryService:CategoryService=inject(CategoryService);
  categories: Category[] = [];
  selectedCategory!:Category;
  isLoading: boolean = false;
  route:ActivatedRoute=inject(ActivatedRoute);
  constructor(private router:Router,private cd: ChangeDetectorRef){}
  goToCategory(id: string) {
    this.router.navigate(['/categories', id]);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      const id = params.get('categoryId');

      if (id) {
        // Load specific category
        this.getSpecificCategory(id);

      } else {
        // Load all categories
        this.getAllCategories();
      }

    });
  }
  getAllCategories(){
    this.isLoading=true;
    this.categoryService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories=res.data;
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error:(err)=>{
        console.log(err);
        this.isLoading = false;
        this.cd.detectChanges();
      }
    })
  }
  getSpecificCategory(categoryId:string){
    this.isLoading=true;
    this.categoryService.getSpecificCategory(categoryId).subscribe({
      next:(res)=>{
        this.selectedCategory=res.data;
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error:(err)=>{
        console.log(err);
        this.isLoading = false;
        this.cd.detectChanges();
      }
    })
  }

}
