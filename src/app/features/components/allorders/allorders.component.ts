import { AuthService } from './../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { OrderService } from './../../services/order/order.service';
import { Component, inject, OnInit, signal, WritableSignal, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  orderService:OrderService=inject(OrderService);
  authService:AuthService=inject(AuthService);
  orders: WritableSignal<any[]>=signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  platformId=inject(PLATFORM_ID)
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      const token = localStorage.getItem('userToken');
      if (!token) return;

      const decoded: any = jwtDecode(token);
      const userId = decoded?.id;

      if (userId) {
        this.getUserOrders(userId);
      }
    }
    
  }
  getUserOrders(userId:string){
    this.isLoading.set(true);
    this.orderService.getUserOrders(userId).subscribe({
      next:(res)=>{
        console.log("ORDERS RESPONSE:", res);
        this.orders.set(res);
        this.isLoading.set(false);
      },
      error:(err)=>{
        console.log(err);
        this.isLoading.set(false);
      }
    })
  }

}
