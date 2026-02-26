import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/components/home/home.component';
import { CartComponent } from './features/components/cart/cart.component';
import { ProductsComponent } from './features/components/products/products.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { BrandsComponent } from './features/components/brands/brands.component';
import { LoginComponent } from './core/components/auth/login/login.component';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { ForgetpasswordComponent } from './core/components/auth/forgetpassword/forgetpassword.component';
import { ProductdetailsComponent } from './features/components/productdetails/productdetails.component';
import { ShippingaddressComponent } from './features/components/shippingaddress/shippingaddress.component';
import { AllordersComponent } from './features/components/allorders/allorders.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home', component:HomeComponent, title:'home'},
    {path:'allorders', component:AllordersComponent, title:'allorders'},
    {path:'shippingaddress/:cartid', component:ShippingaddressComponent, title:'shippingaddress'},
    {path:'cart',canActivate:[authGuard], component:CartComponent, title:'cart'},
    {path:'products', component:ProductsComponent, title:'products'},
    {path:'productdetails/:id', component:ProductdetailsComponent, title:'productdetails'},
    {path:'categories', component:CategoriesComponent, title:'categories'},
    {path:'categories/:categoryId', component:CategoriesComponent, title:'categories'},
    {path:'brands', component:BrandsComponent, title:'brands'},
    {path:'brands/:brandId', component:BrandsComponent, title:'brands'},
    {path:'login', component:LoginComponent, title:'login'},
    {path:'register', component:RegisterComponent, title:'register'},
    {path:'forgetpassword',component:ForgetpasswordComponent,title:'forgetpassword'},
    {path:'**', component:NotfoundComponent, title:'notfound'},
];
