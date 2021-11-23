import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-suggestion',
  templateUrl: './product-suggestion.component.html',
  styleUrls: ['./product-suggestion.component.scss']
})
export class ProductSuggestionComponent implements OnInit {

  @Input() products!: Product[];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 2],
    ['sm', 3],
    ['md', 5],
    ['lg', 2],
    ['xl', 3],
  ]);
  constructor(private media: MediaObserver) {
    this.columns$ = this.media.asObservable().pipe(map((mc: MediaChange[]) => <number>this.breakpointsToColumnsNumber.get(mc[0].mqAlias)),
      startWith(3)
    );
  }

  ngOnInit(): void {
  }

}
