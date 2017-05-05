/**
 * Created by Woods on 27/4/17.
 */

import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'rating-star',
  templateUrl: 'rating.star.html',
  styleUrls: ['rating.star.css']
})

export class RatingStarComponet {

  private _rate: number = -1;
  get rate(): number {
    return this._rate;
  }

  // Make sure this is a round number,
  // otherwise we cannot find the star we want
  // to highlight
  @Input() set rate(rate: number) {
    this._rate = Math.round(rate);
  }

  @Input() active; boolean = false;

  @Output() ratingEmitter = new EventEmitter();

  starClicked(n: number) {
    if (!this.active) return;
    this.rate = n;
    this.ratingEmitter.emit(this.rate)
  }
}
