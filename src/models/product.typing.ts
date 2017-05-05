/**
 * Created by Donya on 4/8/2017 AD.
 *
 * A file to specify variable types :)
 */

import {SellerDetail} from "./user.typing";

export class Product {

  constructor();
  constructor(
    public iid?: string,
    public name?: string,
    public description?: string,
    public price?: number,
    public category: Category = {
      cid: '',
      name: ''
    },
    public location: ProductLocation = {
      province: '',
      city: '',
    },
    public since?: number,
    public seller: SellerDetail = {
      name: '',
      sid: '',
      rating: -1,
      rating_count: 0,
      contact: '',
    },
    private _img_urls: Array<string> = [],
    public delivery_options: Array<DeliveryOption> = []) {

  }

  set img_urls(value: Array<string>) {
    this._img_urls = value;
  }

  get img_urls(): Array<string> {
    return this._img_urls;
  }

  /**
   * Create a TypeScript Product Object from a JSON object
   * @param jObj - the parsed JavaScript Object form
   * of our product model (actual object, not string)
   * @returns {Product}
   */
  static parseProduct(jObj): Product {
    let product: Product = new Product();

    // populate primitive values
    product.iid = jObj['iid'];
    product.name = jObj['name'];
    product.description = jObj['description'];
    product.price = jObj['price'];
    product.since = jObj['since'];

    // different color due to being a setter
    product.img_urls = jObj['url'];

    // Category type
    product.category = {
      cid: jObj['cid'],
      name: jObj['cname']
    };

    // extract the location data and map it according to
    // ProductLocation type {province: string, city: string}
    product.location = {
      province: jObj['province'],
      city: jObj['city']
    };

    // extract the seller data and map it according to
    // SellerDetail type
    product.seller = {
      name: jObj['first_name'] + " " + jObj['last_name'],
      sid: jObj['seller_uid'],
      rating: jObj['rating'],
      rating_count: jObj['rating_count'],
      contact: jObj['phone']
    };

    // FIXME: We don't currently have any option in the dummies
    product.delivery_options = [];
    return product;
  }

}


export interface Category{
  cid: string;
  name: string;
}

export interface DeliveryOption{
  sid:string;
  name:string;
}

export interface ProductLocation {
  province: string;
  city: string;
}

/**
 * a list containing
 * provinceName : [list of cities]
 */
export interface ProvinceCities {
  province: string;
  cities: Array<string>
}
