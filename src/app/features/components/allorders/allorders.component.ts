import { AuthService } from './../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { OrderService } from './../../services/order/order.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

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
  isLoading = false;
  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decoded: any = jwtDecode(token); // decode the JWT
      if (decoded && typeof decoded.id === 'string') {
        const userId = decoded.id;
        this.getUserOrders(userId);
      }
    }
  }
  getUserOrders(userId:string){
    this.isLoading=true;
    this.orderService.getUserOrders(userId).subscribe({
      next:(res)=>{
        this.orders.set(res);
        this.isLoading=false;
      },
      error:(err)=>{
        console.log(err);
        this.isLoading=false;
      }
    })
  }

}
