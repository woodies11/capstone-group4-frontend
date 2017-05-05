/**
 * Created by Woods on 6/4/17.
 */

import {Injectable} from "@angular/core";
import {Product} from "../../models/product.typing";
import {categoryList, serviceList, selectableAddressList} from './productposting.dummy';
import {Category,DeliveryOption} from '../../models/product.typing';
import {products} from "../components/chat/chat.dummy";
import {NetworkService} from "./network.service";

@Injectable()
export class ProductService {

  constructor(private networkService: NetworkService) {
  }

  /**
   * A wrapper function for our dummy data loading
   * Will send and AJAX request which will read JSON data from our
   * Dummy JSON file and send the response back to the callback
   * @param callback
   */
  private load(callback): void {
    let request = new XMLHttpRequest();
    request.onload = function() {
      callback(this.responseText);
    };
    request.open("get", "/assets/dummies-data/products.json", true);
    request.send();
  }

  /* ------------------------------------------------------------------ *
   External APIs
   * ------------------------------------------------------------------ */

  /**
   * Get a product object for a specific product id (iid)
   * @param iid - product id (used to be item id so iid)
   * @returns {Promise<Product>}
   */
  getProduct(iid: string): Promise<Product> {
    return new Promise<Product>(resolve => {
      this.networkService.makeAjax("/Product/" + iid, (result) => {
        let json = JSON.parse(result);
        if (json['status'] != 200) {
          resolve(null)
        }
        resolve(Product.parseProduct(json['result']));
      });
    })
  }

  /**
   * FIXME: nned change for production
   * For testing, this currently return 50 randomly selected product.
   *
   * Will wait for 1 second while the product parsing is done at init.
   * This is not a best practice, but this function will need to be
   * change entirely anyway, so that will do for now.
   *
   * @returns {Promise<Array<Product>>}
   */
  getProducts() {
    return new Promise<Array<Product>>(resolve => {
      this.load((result) => {

        let products = [];

        for (let p of JSON.parse(result)) {
          products.push(Product.parseProduct(p));
        }

        let temp = [];

        // generate a list of 50 random products
        for (let i = 0; i < 50; i++) {
          let item = products[Math.floor(Math.random()*products.length)];
          // use != not !== to check both null and undefined
          // prevent pushing useless items
          if(item != null) temp.push(item);
        }

        resolve(temp);

      });
    })
  }

  getRecommendation(uid): Promise<Array<Product>> {
    return new Promise(resolve => {
      this.networkService.makeAjax('/GetRecommendation', (result) => {
        let tmp: Array<Product> = [];
        for(let p of JSON.parse(result)['result']) {
          tmp.push(Product.parseProduct(p))
        }
        resolve(tmp)

      }, 'post', {
        uid: uid
      })
    });

  }

  /**
   * Return (in callback) a list of products within a given categories
   * @param cid
   */
  getProductsForCid(cid: string, limit=50, start=0): Promise<Array<Product>> {
    return new Promise<Array<Product>>(resolve => {
      this.networkService.makeAjax("/ProductForCategory/"+cid, (result) => {
        let products = JSON.parse(result);
        let tmp: Array<Product> = [];
        for(let product of products['result']) {
          tmp.push(Product.parseProduct(product))
        }
        resolve(tmp);
      });
    })
  }

  /**
   * Return a list of categories, used mainly for displaying form options
   * in the ProductPosting page
   * @returns {Array<Category>}
   */
  getCategoryList(): Promise<Array<Category>>{
    return new Promise(resolve => {
      this.networkService.makeAjax('/Categories', (result) => {
        resolve(JSON.parse(result)['result'])
      })
    });
  }

  /**
   * Return a list of services, used mainly for displaying form options
   * in the ProductPosting page
   * @returns {Array<Category>}
   */
  getServiceList(): Array<DeliveryOption>{
    return serviceList;
  }

  /**
   * This array is a cache for provinces list after reformatting it to contain
   * only the province part, mainly for the purpose of form options
   * @type {Array}
   */
  provincesList: Array<string> = [];

  /**
   * Return a list of provinces, used mainly for displaying form options
   * in the ProductPosting page
   * @returns {Array<Category>}
   */
  getProvinceList(): Array<string>{
    if (this.provincesList.length <= 0) {
      for (let province_cities of selectableAddressList) {
        this.provincesList.push(province_cities.province)
      }
    }
    return this.provincesList;
  }

  /**
   * Return a list of cities selectable within that province,
   * used mainly for displaying form options in the ProductPosting page
   * @returns {Array<Category>}
   */
  getCityList(province: string): Array<string>{
    for (let province_cities of selectableAddressList) {
      if (province_cities.province === province) {
        return province_cities.cities;
      }
    }
    return [];
  }

  getCategoryInfo(cid: string): Promise<Category> {
    return new Promise(resolve => {
      this.networkService.makeAjax('/CategoryInfo/'+cid, (result) => {
      resolve(JSON.parse(result)['result'])
    })
    })
  }

  getProductCount(cid: string): Promise<number> {
    return new Promise(resolve => {
      this.networkService.makeAjax('/ProductCount/'+cid, (result) => {
        resolve(JSON.parse(result)['result'])
      })
    })
  }

  postProduct(product: Product): Promise<any> {
    return new Promise(resolve => {
      this.networkService.makeAjax('/PostProduct', result => {
        resolve(result)
      }, 'post', product)
    })
  }

}
