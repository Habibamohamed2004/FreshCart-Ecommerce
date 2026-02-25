import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ResetnewpasswordComponent } from '../resetnewpassword/resetnewpassword.component';

@Component({
  selector: 'app-resetcode',
  imports: [ReactiveFormsModule,ResetnewpasswordComponent],
  templateUrl: './resetcode.component.html',
  styleUrl: './resetcode.component.scss',
})
export class ResetcodeComponent {
  resetCodeForm:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{4,}$/)])
  })
  errMsg:WritableSignal<string>=signal<string>('');
  isLoading:WritableSignal<boolean>=signal<boolean>(false);
  resetNewPasswordFlag:boolean=false;
  resetCodeFlag:boolean=true;
  authService:AuthService = inject(AuthService);

  submitResetCodeForm(){
    if(this.resetCodeForm.valid){
      this.isLoading.set(true);
      this.authService.verifyResetCode(this.resetCodeForm.value).subscribe({
        next:res=>{
          console.log(res);
          this.isLoading.set(false);
          this.resetCodeFlag=false;
          this.resetNewPasswordFlag=true;
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
