/**
 * Created by Woods on 23/4/17.
 */

import {Component} from "@angular/core";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Category} from "../../../models/product.typing";

@Component({
  selector: 'category-page',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.css'],
})

export class CategoryPage {

  cid: string;
  category: Category;
  products = [];
  count: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cid = params['cid'];

      this.productService.getCategoryInfo(this.cid).then((result) => {
        this.category = result;
      });

      this.productService.getProductsForCid(this.cid).then((result) => {
        this.products = result;
      });

      this.productService.getProductCount(this.cid).then((result) => {
        this.count = result['count'];
      })
    });
  }

}
