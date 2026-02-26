import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '../../../shared/models/Iproduct';
import { BrandService } from './../../services/brand/brand.service';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brandService:BrandService=inject(BrandService);
  brands: Brand[] = [];
  selectedBrand!: Brand;
  isLoading: boolean = false;
  route:ActivatedRoute=inject(ActivatedRoute);
  constructor(private router:Router,private cd: ChangeDetectorRef){}
  goToBrand(id: string) {
    this.router.navigate(['/brands', id]);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      const id = params.get('brandId');

      if (id) {
        // Load specific category
        this.getSpecificBrand(id);

      } else {
        // Load all categories
        this.getAllBrands();
      }

    });
  }
  getAllBrands(){
    this.isLoading=true;
    this.brandService.getAllBrands().subscribe({
      next:res =>{
        this.brands=res.data;
        this.isLoading = false;
        this.cd.detectChanges();
      }
    })
  }
  getSpecificBrand(brandId:string){
    this.isLoading=true;
    this.brandService.getSpecificBrand(brandId).subscribe({
      next:res=>{
        this.selectedBrand=res.data;
        this.isLoading = false;
        this.cd.detectChanges();
      }
    })
  }
}
