/**
 * Created by Woods on 18/12/16.
 *
 * This file contain all the routing rules for this app.
 * Modify entries in `appRoutes` to change the rules.
 */

import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import {Product} from "../models/product.typing"

import {ChatPage} from "./pages/chat/chat.page";
import {ChatCreate} from "./pages/chat/chat.create";
import {HomePage} from "./pages/home/home.page";
import {RatingPage} from "./pages/rating/rating.page";
import {ProductPosting} from "./pages/productPosting/productposting.page";
import {ProductDetailPage} from "./pages/product-detail/product-detail.page";
import {CategoriesPage} from "./pages/categories-page/categories.page";
import {CategoryPage} from "./pages/category-page/category.page";

/**
 * Contain all the routing rules of this app.
 * Routing rules tell the app what to do or which component
 * to show, base on the parameter after the "www.PAGE_URL.com/"
 *
 * Note that `useHash` is set to true for compatibility.
 * This will simply add a '#' before the parameter when redirect
 */
const appRoutes: Routes = [
  {
    // redirect default (empty) link to the home page
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'chat',
    component: ChatPage
  },
  {
    path: 'chat/:iid',
    component: ChatPage
  },
  {
    path: 'rating/:iid',
    component: RatingPage
  },
  {
    path: 'product/:iid',
    component: ProductDetailPage
  },
  {
    path: 'prod-post',
    component: ProductPosting
  },
  {
    path: 'categories',
    component: CategoriesPage
  },
  {
    path: 'category/:cid',
    component: CategoryPage
  },
  {
    path: 'chat-create/:sid/:iid',
    component: ChatCreate
  }

];

export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
