import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, startWith } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  time$: Observable<Date>;

  constructor() {
    this.time$ = interval(60000).pipe(startWith(new Date()), map(tick => new Date()));
  }

}
