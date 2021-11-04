import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../shared/services'; 
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly columns$: Observable<number>;
  readonly products$: Observable<Product[]>;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs',1],
    ['sm',2],
    ['md',3],
    ['lg',4],
    ['xl',5],
  ]);
  constructor(private media: MediaObserver, private productService:ProductService) {
    this.products$=this.productService.getAll();
    this.columns$=this.media.asObservable().pipe(
      map(
        (change: MediaChange[]) =>          
          <number>this.breakpointsToColumnsNumber.get(change[0].mqAlias)));
      
   }

  ngOnInit(): void {
  }

}
