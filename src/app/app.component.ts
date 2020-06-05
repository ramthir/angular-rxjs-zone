import { Component, NgZone, OnDestroy } from '@angular/core';
import { interval, Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, startWith, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-root',
  template: `<span id="time">{{timeSub | async | date: 'short'}}</span>`
})
export class AppComponent implements OnDestroy {

  private readonly destroySub = new Subject<void>();
  timeSub: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  constructor(private readonly zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      interval(60000).pipe(map(tick => new Date()), takeUntil(this.destroySub)).subscribe(this.timeSub.next)
    });
  }

  ngOnDestroy() {
    this.destroySub.next();
    this.destroySub.complete();
  }
}
