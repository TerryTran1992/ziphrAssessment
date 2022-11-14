import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/*
* GlobalSpinnerStore provide methods to show and hide global spinner
* */
@Injectable({
  providedIn: 'root',
})
export class GlobalSpinnerStore {
  /*
  * BehaviorSubject to store current state of global spinner
  * */
  private _isShow$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isShow$(): Observable<boolean> {
    return this._isShow$;
  }

  public show(): void {
    this._isShow$.next(true);
  }

  public hide(): void {
    this._isShow$.next(false);
  }
}
