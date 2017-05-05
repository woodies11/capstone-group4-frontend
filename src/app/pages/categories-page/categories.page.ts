/**
 * Created by Woods on 23/4/17.
 */

import {Component, OnInit} from "@angular/core";
import {Category} from "../../../models/product.typing";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'categories-page',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.css'],
})

export class CategoriesPage {
  categories: Array<Category> = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getCategoryList().then(result => {
      this.categories = result;
    });
  }

}
