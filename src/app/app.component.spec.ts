/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ChatComponent} from "./components/chat/chat.component";
import {APP_ROUTES} from "./app.routing";
import {ChatPage} from "./pages/chat/chat.page";
import {HomePage} from "./pages/home/home.page";
import {RatingPage} from "./pages/rating/rating.page";
import {NavAreaModule} from "./components/nav/nav-area/nav-area.module";
import {ProductPostingPage} from "./components/productposting/productposting.component";
import {ProductPosting} from "./pages/productPosting/productposting.page";
import {CatalogueComponent} from "./components/catalogue/catalogue.component";
import {ProductDetailPage} from "./pages/product-detail/product-detail.page";
import {ProductService} from "./services/product.service";
import {CategoriesPage} from "./pages/categories-page/categories.page";
import {CategoryPage} from "./pages/category-page/category.page";
import {RecommendationComponent} from "./components/recommendation/recommendation.component";
import {UserService} from "./services/user.service";
import {RatingStarComponet} from "./components/ratingstar/rating.star.component";
import {ChatCreate} from "./pages/chat/chat.create";
import {NetworkService} from "./services/network.service";

describe('Test environment is running correctly', () => {
  it('true is true', () => expect(true).toBe(true));
});

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ChatComponent,
        CatalogueComponent,
        ChatPage,
        HomePage,
        RatingPage,
        ProductPostingPage,
        ProductPosting,
        ProductDetailPage,
        CategoriesPage,
        CategoryPage,
        RecommendationComponent,
        RatingStarComponet,
        ChatCreate
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NavAreaModule,
        APP_ROUTES
      ],
      providers: [ProductService, UserService, NetworkService],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
