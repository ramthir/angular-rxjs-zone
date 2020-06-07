import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, startWith } from "rxjs/operators";

@Component({
  selector: 'app-root',
  template: `<span id="time">{{time$ | async | date: 'short'}}</span>`
})
export class AppComponent {

  time$: Observable<Date>;

  constructor() {
    this.time$ = interval(60000).pipe(startWith(new Date()), map(tick => new Date()));
  }

}
