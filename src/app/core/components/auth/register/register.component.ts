import { Component, inject, signal, WritableSignal } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { log } from 'console';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService:AuthService=inject(AuthService);
  private router:Router= inject(Router)
  errMsg:WritableSignal<string>=signal<string>('');
  isLoading:WritableSignal<boolean> = signal<boolean>(false);
  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required, Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{7,20}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.passwordMatchValidator)

  submitRegisterForm(){
    if(this.registerForm.valid){
      this.isLoading.set(true);
      this.authService.signUp(this.registerForm.value).subscribe({
        next:res=>{
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

  passwordMatchValidator(x:AbstractControl){
    if(x.get('password')?.value === x.get('rePassword')?.value){
      return null
    }
    else{
      x.get('rePassword')?.setErrors({mismatch:true});
      return{mismatch:true}
    }
  }
}
