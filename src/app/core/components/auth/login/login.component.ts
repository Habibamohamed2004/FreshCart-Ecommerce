import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService:AuthService=inject(AuthService);
  private router:Router= inject(Router)
  errMsg:WritableSignal<string>=signal<string>('');
  isLoading:WritableSignal<boolean> = signal<boolean>(false);
  logInForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required, Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{7,20}$/)])
  })

  submitLogInForm(){
    if(this.logInForm.valid){
      this.isLoading.set(true);
      this.authService.logIn(this.logInForm.value).subscribe({
        next:res=>{
          console.log(res);
          this.isLoading.set(false);
          localStorage.setItem('userToken',res.token);
          this.authService.decodeUserData();
          this.router.navigate(['home']);
        },
        error: err=>{
          this.errMsg.set(err.error.message);
          this.isLoading.set(false);
          console.log(this.errMsg());
        }
      })
      
    }
  }
}
