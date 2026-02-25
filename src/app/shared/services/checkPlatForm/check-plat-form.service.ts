import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckPlatFormService {
  constructor(@Inject(PLATFORM_ID) private ID:object){}
  CheckIsPlatFormBrowser(){
    if(isPlatformBrowser(this.ID)){
      return true;
    }
    return false;
  }
}
