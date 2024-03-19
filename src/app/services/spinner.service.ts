import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerVisibility = new BehaviorSubject<boolean>(false);

  show() {
    this.spinnerVisibility.next(true);
  }

  hide() {
    this.spinnerVisibility.next(false);
  }

  getSpinnerVisibility(): Observable<boolean> {
    return this.spinnerVisibility.asObservable();
  }

  showForRouteNavigation() {
    this.show();
  }

  hideAfterRouteNavigation() {
    this.hide();
  }
}
