import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { CheckPlatFormService } from '../../../shared/services/checkPlatForm/check-plat-form.service';
@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {

  translateService:TranslateService =inject(TranslateService);
  checkPlatFormService:CheckPlatFormService=inject(CheckPlatFormService);
  constructor(){
    if(this.checkPlatFormService.CheckIsPlatFormBrowser()){
      let defaultLang:string='en';
      if(localStorage.getItem('lang')!=null){
        defaultLang=localStorage.getItem('lang')!;
      }
      this.translateService.setFallbackLang(defaultLang);
      this.translateService.use(defaultLang);
      this.changeDirection(defaultLang);
      }
  
  }

  changeDirection(lang:string){
    if(lang === 'ar'){
      document.dir='rtl'
    }
    else{
      document.dir='ltr'
    }
  }
  changeLang(lang:string){
    localStorage.setItem('lang',lang);
    this.translateService.setFallbackLang(lang);
    this.translateService.use(lang);
    this.changeDirection(lang);
  }
}
