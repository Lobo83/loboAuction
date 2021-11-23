import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent  {

  @Input() product!: Product;
  constructor() { }


}
