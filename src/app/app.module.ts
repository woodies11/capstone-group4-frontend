import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
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


/**
 *  App Module is the module containing the entire app.
 */
@NgModule({

  /**
   *  Any export classes that we want to use in our app
   *  we need to add it to the `declarations: [...]` array
   */
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

  /**
   *  `imports: [...]` is for MODULES.
   *  Add to this list any module we want to use.
   *
   *  Note that APP_ROUTES is in fact a module that we set up
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavAreaModule,
    APP_ROUTES
  ],
  providers: [ProductService, UserService, NetworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
