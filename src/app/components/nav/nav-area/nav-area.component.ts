/**
 * Created by Woods on 16/12/16.
 */

import {Component, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'nav-area',
  templateUrl: './nav-area.html',
  styleUrls: ['./nav-area.css']
})

export class NavArea {

  isDrawerExpanded = false;

  constructor(
    private router: Router
  ) {}

  toggleDrawer(shouldExpand) {
    this.isDrawerExpanded = shouldExpand;
  }

  toContact() {
    this.router.navigate(['/contact']);
  }


}
