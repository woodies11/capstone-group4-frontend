/**
 * Created by Woods on 6/4/17.
 */

import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../../models/product.typing";
import {UserService} from "../../services/user.service";
import {Router} from '@angular/router';

@Component({
  selector: 'product-detail-page',
  templateUrl: 'product-detail.page.html',
  styleUrls: ['product-detail.page.css']
})

export class ProductDetailPage {

  selectedProduct: Product;
  selectedImage: string;

  current_uid: string = "";

  selectImg(img: string) {
    this.selectedImage = img;
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.current_uid = this.userService.getCurrentUID();

    this.route.params.subscribe(params => {
      this.productService.getProduct(params['iid']).then(
        (product: Product) => {
          this.selectedProduct = product;
          if (this.selectedProduct != null) {
            this.selectImg(this.selectedProduct.img_urls[0]);
            this.userService.trackUserData(this.selectedProduct.category.cid);
          }
        }
      );
    });
  }

  toChatRoom() {
    this.router.navigate(['/chat-create', this.selectedProduct.seller.sid ,this.selectedProduct.iid]);
  }

}
