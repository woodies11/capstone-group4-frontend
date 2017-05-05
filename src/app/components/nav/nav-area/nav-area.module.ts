/**
 * Created by Woods on 16/12/16.
 */
import {NgModule} from "@angular/core";
import {MenuButton} from '../btn-menu/btn-menu.component'
import {NavArea} from "./nav-area.component";
import {CommonModule} from "@angular/common";
import {NavDrawer} from "../nav-drawer/nav-drawer";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavArea, MenuButton, NavDrawer],
  exports: [NavArea]
})

export class NavAreaModule {

}
