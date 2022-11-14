import { Component } from '@angular/core';
import { GlobalSpinnerStore } from './global-spinner.store';

@Component({
  selector: 'app-global-spinner',
  templateUrl: './global-spinner.component.html',
})
export class GlobalSpinnerComponent {
  public isShow$ = this.globalSpinner.isShow$;

  public constructor(private globalSpinner: GlobalSpinnerStore) {
  }
}
