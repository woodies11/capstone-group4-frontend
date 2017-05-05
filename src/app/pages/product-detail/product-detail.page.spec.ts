/**
 * Created by Woods on 28/4/17.
 */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import {Component, DebugElement, Directive, Injectable}    from '@angular/core';

import {ProductDetailPage} from "./product-detail.page";
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";
import {RatingStarComponet} from "../../components/ratingstar/rating.star.component";
import {ActivatedRoute, Data, Router, RouterModule} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../../../models/product.typing";
import {isUndefined} from "util";

describe(' ProductDetailPage ', () => {

  let comp: ProductDetailPage;
  let fixture: ComponentFixture<ProductDetailPage>;
  let nativeElement;
  let productStub: Product;
  let router: Router;

  // configure our test environment before each test
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductDetailPage,
        RatingStarComponet,
        RecommendationStub
      ],
      imports: [
        RouterModule
      ],
      providers: [
        { provide: ProductService, useClass: ProductServiceStub},
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        {
          provide: UserService,
          useClass: class userServiceStub {
            getCurrentUID = () => {
              return 'user'
            };

            trackUserData() {
              return;
            }
        }}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailPage);
    comp = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    this.productStub = new Product();
    this.productStub.iid = 'karma_iid';
    this.productStub.name = 'karma_product';
    this.productStub.description = 'this is a test product';
    this.productStub.price = 192;
    this.productStub.category = {
      cid: 'karma_cid',
      name: 'karma_test_category'
    };
    this.productStub.seller = {
      sid: 'karma_sid',
      name: 'karma',
      rating: 4,
      rating_count: 99,
      contact: 'me',
    };
    this.productStub.since = 847830746000;
    this.productStub.location = {
      province: 'Victoria Island',
      city: 'Henesys'
    };
    this.productStub.img_urls = [
      'https://ayumilovemaple.files.wordpress.com/2008/11/worldmap10-baseimg-0.png',
      'https://cdn.mmos.com/wp-content/gallery/maplestory-overview/MapleStory-Gameplay-4.jpg'
    ];
  });

  it("expect mock UID from userService to be 'user'", () => {
    let userService = fixture.debugElement.injector.get(UserService);
    expect(userService.getCurrentUID()).toBe('user');
  });

  it("expect the ProductDetailComponent to correctly receive mock UID", () => {
    expect(comp.current_uid).toBe('');
    fixture.detectChanges();
    expect(comp.current_uid).toBe('user');
  });

  it("expect 404 Product Not Found!", () => {
    expect(fixture.nativeElement.querySelector('h1')).toBe(null);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('404');
    expect(fixture.nativeElement.querySelector('h3').textContent).toContain('Product Not Found!');
  });

  it("expect to correctly query a stub Product after setting one", () => {

    let productService = fixture.debugElement.injector.get(ProductService);

    // sanity check, default value should be empty
    productService.getProduct('').then(result => {
      expect(isUndefined(result)).toBe(true);
    });

    // force render
    fixture.detectChanges();

    // should show 404 since a stub product hasn't yet been given
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('404');
    expect(fixture.nativeElement.querySelector('h3').textContent).toContain('Product Not Found!');

    // give it a stub and test query
    productService.product = this.productStub;
    productService.getProduct('').then(result => {
      expect(result.iid).toBe('karma_iid');
      expect(result.category['cid']).toBe('karma_cid');
      expect(result.category['name']).toBe('karma_test_category');
    });

  });

  it("expect to render correctly after (async)", async(() => {
    // get our injected services
    let productService = fixture.debugElement.injector.get(ProductService);
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);

    // give it a stub Product
    productService.product = this.productStub;
    // for the activatedRoutedStub to resolve its params
    activatedRoute.testParams = {iid: 'karma_test_iid'};

    // force page rendering
    fixture.detectChanges();

    // since getProduct is an async process (normally network call)
    // we need to wait until the async task is finish before proceeding
    fixture.whenStable().then(() => {
      // force page re-render
      fixture.detectChanges();

      // selectedProduct returned from the stub productService
      expect(isUndefined(comp.selectedProduct)).toBe(false);

      // test if the page is rendered correctly
      expect(nativeElement.querySelector('h3').textContent).toContain('karma_product');

    });
  }));


});

@Directive({selector: 'recommendation-box'})
class RecommendationStub {

}

class ProductServiceStub {

  product: Product;

  getProduct(iid): Promise<Product> {
    return new Promise(resolve => {
      resolve(this.product)
    })
  }
}

class RouterStub {
  navigateByUrl(url: string) {return url;}
}

@Injectable()
class ActivatedRouteStub {
  // ActivatedRoute.params is Observable
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  // Test parameters
  private _testParams: {} = {iid: 'karma_params_iid'};
  get testParams() { return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  // ActivatedRoute.snapshot.params
  get snapshot() {
    return { params: this.testParams };
  }
}
