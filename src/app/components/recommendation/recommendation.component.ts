/**
 * Created by Woods on 26/4/17.
 */

import {Component} from "@angular/core";
import {Product} from "../../../models/product.typing";
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'recommendation-box',
  template: `    
    <div class="recommendation-box">
      สินค้าแนะนำ:
      <catalogue-component [ITEM_LIMIT]="10" [products]="products"></catalogue-component>
    </div>`,
  styles: [
    `
    .recommendation-box {
      height: auto;
      overflow: hidden;
    }`
  ]
})

export class RecommendationComponent {
  products: Array<Product> = [];

  // empty constructor to inject productService
  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {}

  // FIXME: change this to query the real recommendations
  ngOnInit(): void {
    this.productService.getRecommendation(this.userService.getCurrentUID()).then(
      (products: Array<Product>) => {
        this.products = products
      }
    );
  }

}


