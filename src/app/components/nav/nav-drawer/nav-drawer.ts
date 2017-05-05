/**
 * Created by Woods on 17/12/16.
 */
import {Component, Input} from "@angular/core";

@Component({
  selector: 'nav-drawer',
  templateUrl: './nav-drawer.html',
  styleUrls: ['./nav-drawer.css']
})

export class NavDrawer {

  @Input() isExpanded = false;

}
