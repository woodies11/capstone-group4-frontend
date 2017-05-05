/**
 * Created by Woods on 16/12/16.
 */

import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'btn-menu',
  templateUrl: './btn-menu.html',
  styleUrls: ['./btn-menu.css']
})

export class MenuButton {
  /**
   * true for drawer open
   * @type {boolean}
   */
  @Input() isMenuExpanded = false;
  @Output() onClickEvent = new EventEmitter<boolean>();

  /**
   * emit true when turning into X (cross)
   */
  toggleState() {
    this.isMenuExpanded = !this.isMenuExpanded;
    this.onClickEvent.emit(this.isMenuExpanded);
  }

}
