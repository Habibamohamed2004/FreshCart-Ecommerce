import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/Iproduct';

@Pipe({
  name: 'searchproduct',
})
export class SearchproductPipe implements PipeTransform {

  transform(productList:Product[],userSearch:string): Product[] {
    return productList.filter(product=>product.title.toLowerCase().includes(userSearch.toLowerCase()));
  }

}
