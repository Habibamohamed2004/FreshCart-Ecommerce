import { MyTranslateService } from './../../../services/myTranslate/my-translate.service';
import { CartService } from './../../../../features/services/cart/cart.service';
import { Component, effect, OnInit, signal, WritableSignal, inject } from '@angular/core';
import { FlowbiteService } from '../../../services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  myTranslateService:MyTranslateService=inject(MyTranslateService);
  cartItems:WritableSignal<number>=signal<number>(0);
  isLogin:boolean =false;
  constructor(private flowbiteService: FlowbiteService, public authService:AuthService, public cartService:CartService) {
    effect(() =>{
        if(this.authService.userData()!= null){
          this.isLogin=true;
        }
        else{
          this.isLogin=false;  
        }
      })
  }

    ngOnInit(): void {
      this.cartService.NoOfcartItems.subscribe({
        next:data=>{
          this.cartItems.set(data);
          console.log(this.cartItems());
          
        }
      })
      
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });
    }
}
