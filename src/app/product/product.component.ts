import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Product, ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  product$: Observable<Product>;
  suggestedProducts$: Observable<Product[]> ;
  allProducts$:Observable<Product[]> = this.productService.getAll();

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    
    this.product$ = this.route.paramMap.pipe(map(params => parseInt(params.get('productId') || '', 10)),
      filter(productId => !!productId),
      switchMap(productId => {
        return this.productService.getById(productId);
      }
      )
    );
    
    this.suggestedProducts$=  this.route.paramMap.pipe(map(params => parseInt(params.get('productId') || '', 10)),
    filter(productId => !!productId), /* !! significa que si un valor es NaN, string vacío, 0, nulo o indefinido devuelve falso, true en otro caso
    !!0--> false
    !!null--> false
    !!NaN--> false
    !!""-->false
    !!undefined-->false
    */
    switchMap(productId => {
      return this.allProducts$.pipe(map(products=>{
        return products.filter(product=>product.id !== productId);
      }));
    }
    )
  );
    
     /*this.productService.getAll().subscribe(products => {
      
      for (let product of products){
        if (product.id !== prodId){
          this.suggestedProducts.push(product);
        }
    }
  });*/
  
}

  

}
