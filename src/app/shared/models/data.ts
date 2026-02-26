import { ShippingaddressComponent } from './../../features/components/shippingaddress/shippingaddress.component';
import { ForgetpasswordComponent } from './../../core/components/auth/forgetpassword/forgetpassword.component';
export interface signUpData extends logInData{
    name:string;
    email:string;
    password:string;
    rePassword:string;
    phone:string;
}
export interface logInData{
    email:string;
    password:string;
}
export interface forgetPasswordData{
    email:string;
}
export interface resetCodeData{
    resetCode:string;
}
export interface resetNewPasswordData{
    email:string;
    newPassword:string;
}
export interface ShippingaddressData{
    details:string;
    phone:string;
    city:string;
}
