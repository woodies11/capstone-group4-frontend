/**
 * Created by Woods on 5/4/17.
 */
import {Component, Input} from "@angular/core";
import {Product} from "../../../models/product.typing";

@Component({
  selector: 'catalogue-component',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})

export class CatalogueComponent {

  /**
   * The maximum number of items to show.
   * Note that each row will contain max of 5 items.
   * By default this is set to 10.
   * @type {number}
   */
  @Input()
  ITEM_LIMIT = 10;

  @Input()
  products: Array<Product> = [];

}
