import { ForgetpasswordComponent } from './../../components/auth/forgetpassword/forgetpassword.component';
import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { forgetPasswordData, logInData, resetCodeData, resetNewPasswordData, signUpData } from '../../../shared/models/data';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../../../../enviroment/enviroment';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { log } from 'node:console';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData :WritableSignal<null|JwtPayload> = signal<null|JwtPayload>(null);
  private router:Router=inject(Router);
  constructor(private httpClient:HttpClient,@Inject(PLATFORM_ID) ID:object){
    if(isPlatformBrowser(ID)){
      if(localStorage.getItem('userToken') !=null){
        this.decodeUserData();
      }
    }
  }
  signUp(data:signUpData):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/signup`,data)
  }
  logIn(data:logInData):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/signin`,data)
  }
  decodeUserData(){
    const token = localStorage.getItem('userToken')!;
    const decoded =jwtDecode(token);
    this.userData.set(decoded);
    console.log(this.userData(),'userData');
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.userData.set(null);
    this.router.navigate(['login']);

  }

  forgetPassword(data:forgetPasswordData):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }

  verifyResetCode(data:resetCodeData):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  
  resetNewPassword(data:resetNewPasswordData):Observable<any>{
    return this.httpClient.put(`${enviroment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}
