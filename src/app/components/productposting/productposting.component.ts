/**
 * Created by Donya on 4/5/2017 AD.
 *
 * newProduct is the new item that the seller will sell
 *
 * the value of newProduct will change according to the input value of the user via
 * the use of ngModel which dynamically binds the value
 *
 * Destination of the detail of newProduct can be identified in the onSubmit function
 */

/*
 * [DONE] TO-DO VERY IMPORTANT!! --> images upload must be shown
 * idea to do this is to store the url(directory) of the received files
 * and fetch it from database!
 * -- ACTUAL:
 * We do not want to submit the data to the database each time as the user can be a **
 * and change their mind about the images often, so instead, we convert the whole image
 * into URL Data Representation (Like URL friendly form of Binary Data) and display them
 *
 * TODO: Add * in in HTML for each required field
 * TODO: need to find a way to submit images
 * TODO: style image previews
 * TODO: better way to handle province, only list the cities once a province is selected
 * TODO: submit the newProduct obj w/t the ProductService... which doesn't yet have this
 * TODO: implement a function in ProductService to submit the model
 */

import {Component, OnInit} from "@angular/core";
import {Category, DeliveryOption, Product} from '../../../models/product.typing';
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'prod-component',
  templateUrl: './productPosting.component.html',
  styleUrls: ['./productPosting.component.css'],
})

export class ProductPostingPage implements OnInit {

  selectedValue = null;

  newProduct: Product = new Product();
  categories: Array<Category> = null;
  services: Array<DeliveryOption> = null;
  provinces: Array<string> = null;
  cities: Array<string> = null;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.newProduct.seller.sid = this.userService.getCurrentUID();

    this.productService.getCategoryList().then(result => {
      this.categories = result;
    });
    this.services = this.productService.getServiceList();
    this.provinces = this.productService.getProvinceList();
  }

  /**
   * An array containing all image URL data in Base64
   * !! Only use to show previews in the browser !!
   *
   * @type {Array}
   */
  imgDataURLs: Array<string> = [];

  /**
   *  File browser will call this method upon returning.
   *  Thus, when the user selected a file or files.
   * @param input
   */
  fileChange(input) {
    this.readFiles(input.files);
  }

  /**
   * Iterate through the list of files and extract the data
   * from each as Base64 string then store them into imgDataURLs
   * array which the HTML can then use as src of an <img>
   * @param files - the list of image files
   */
  readFiles(files) {
    /**
     * Extract data from each file as URL Data Representation
     * And return to the callback an Event object
     *
     * The function is extract here so we can reuse the
     * FileReader object.
     */
    let readFile = function(file, reader, callback) {
      reader.onload = (e) => {
        callback(e);
      };

      reader.readAsDataURL(file);
    };

    // clear the array by setting length to 0
    // (this method is one of the best practice)
    this.imgDataURLs.length = 0;

    for (let file of files) {
      // FIXME: Potential Memory Leak!
      // -> Need to find a way to reuse the reader
      let reader = new FileReader();
      readFile(file, reader, (e) => {
        this.imgDataURLs.push(e.target.result);
        this.newProduct.img_urls = this.imgDataURLs;
      })
    }
  }

  /**
   * This method is execute when the user submit the form.
   *
   * Currently, it only logs the user's input to the console.
   */
  onSubmit() {
    console.log(this.newProduct);
    this.productService.postProduct(this.newProduct).then(result => {
      this.router.navigate(['home'])
    });
  }

  /**
   * Only for debug, remove this when done
   */
  get diagnostic() { return JSON.stringify(this.newProduct); }

}
