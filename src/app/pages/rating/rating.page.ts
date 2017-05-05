/*
Created by Andy 6/4/2017
*/

import {Component} from "@angular/core";
import {Product} from "../../../models/product.typing";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component ({
  selector: 'rating-page',
  templateUrl: './rating.html',
  styleUrls: ['./rating.css']
})

export class RatingPage {

  product: Product = null;
  feedback: string = '';
  rating: number = -1;
  rating_count = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // (+) converts string 'iid' to a number
      this.productService.getProduct(params['iid']).then(
        (product: Product) => {
          this.product = product;
          // once got the product detail, detailed query rating information
          this.userService.getRatingDetail(product.seller.sid).then((result) => {
            this.rating_count = result.count;
          })
        }
      );
    });

  }

  ratingUpdate(rating) {
    this.rating = rating;
  }

  sendData() {
    if (this.rating < 0) {
      alert('Please give a rating!');
      return;
    }
    this.userService.submitFeedback({
      buyer_uid: this.userService.getCurrentUID(),
      seller_uid: this.product.seller.sid,
      comment: this.feedback,
      rating: this.rating,
      iid: this.product.iid
    }).then(() => {
      this.router.navigate(['chat'])
    });
  }


}
