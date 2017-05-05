/**
 * Created by Woods on 28/4/17.
 */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import {Component, DebugElement, Directive, Injectable, Input}    from '@angular/core';

import {ProductService} from "../app/services/product.service";
import {UserService} from "../app/services/user.service";
import {ActivatedRoute, Data, Router, RouterModule} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {isUndefined} from "util";
import {RecommendationComponent} from "../app/components/recommendation/recommendation.component";
import {Product} from "../models/product.typing";
import {RatingStarComponet} from "../app/components/ratingstar/rating.star.component";
import {ProductDetailPage} from "../app/pages/product-detail/product-detail.page";
import {CatalogueComponent} from "../app/components/catalogue/catalogue.component";

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
        RecommendationComponent,
        CatalogueComponent
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

      expect(isUndefined(nativeElement.querySelector('recommendation-box'))).toBe(false);

    });
  }));



});

@Directive({selector: 'catalogue-component'})
class CatalogueStub {
  @Input()
  ITEM_LIMIT = 10;
  @Input()
  products: Array<Product> = [];
}

class ProductServiceStub {
  product: Product;

  getProduct(iid): Promise<Product> {
    return new Promise(resolve => {
      resolve(this.product)
    })
  }

  getRecommendation() {
    return new Promise(resolve => {
      resolve([this.product])
    });
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
