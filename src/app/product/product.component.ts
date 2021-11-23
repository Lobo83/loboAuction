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

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    let prodId = 0;
    this.product$ = this.route.paramMap.pipe(map(params => parseInt(params.get('productId') || '', 10)),
      filter(productId => !!productId),
      switchMap(productId => {

        prodId = productId;
        return this.productService.getById(productId);
      }
      )
    );
    this.suggestedProducts$=this.productService.getAll().pipe(map(products=>{
      return products.filter(product=>product.id !== prodId);
    }));
     /*this.productService.getAll().subscribe(products => {
      
      for (let product of products){
        if (product.id !== prodId){
          this.suggestedProducts.push(product);
        }
    }
  });*/
  
}

  

}
