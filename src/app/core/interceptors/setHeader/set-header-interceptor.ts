import { inject } from '@angular/core';
import { CheckPlatFormService } from './../../../shared/services/checkPlatForm/check-plat-form.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const checkPlatFormService:CheckPlatFormService=inject(CheckPlatFormService);
  if(req.url.includes('wishlist')||req.url.includes('cart')||req.url.includes('orders')){
    if(checkPlatFormService.CheckIsPlatFormBrowser()){
      req=req.clone({
        headers:req.headers.set('token',localStorage.getItem('userToken')||'')
      })
    }

  }  
  return next(req);
};
