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
export class ProductComponent  {

  product$: Observable<Product>;
  suggestedProducts$: Observable<Product[]>;

  constructor(private route: ActivatedRoute, private productService: ProductService) { 
    this.product$=this.route.paramMap.pipe(map(params => parseInt(params.get('productId')||'',10)),
    filter(productId=>!!productId),
    switchMap(productId=>this.productService.getById(productId))
    );
    this.suggestedProducts$=this.productService.getAll();
  }

  

}
