import { AuthService } from './../../../services/auth/auth.service';
import { forgetPasswordData } from './../../../../shared/models/data';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetcodeComponent } from '../resetcode/resetcode.component';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule,ResetcodeComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  forgetPasswordForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })
  errMsg:WritableSignal<string>=signal<string>('');
  isLoading:WritableSignal<boolean>=signal<boolean>(false);
  forgetPasswordFlag:boolean=true;
  resetCodeFlag:boolean=false;
  authService:AuthService = inject(AuthService);

  submitForgetPasswordForm(){
    if(this.forgetPasswordForm.valid){
      this.isLoading.set(true);
      this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next:res=>{
          console.log(res);
          this.isLoading.set(false);
          this.forgetPasswordFlag=false;
          this.resetCodeFlag=true;
        },
        error:err=>{
          this.errMsg.set(err.error.message);
          this.isLoading.set(false);
          console.log(this.errMsg());
        }
      })
    }
  }
}
