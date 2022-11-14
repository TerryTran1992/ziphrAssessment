import { Directive, HostBinding, Input, Optional } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appFormControl]',
})
export class ControlValidityDirective {
  @Input() public formControlName: string = '';

  @HostBinding('class.is-invalid') get isInvalid(): boolean {
    const control = this.getControl();

    if (!control) {
      return false;
    }
    return control.invalid && (control.dirty || control.touched || this.formDirective?.submitted);
  }

  @HostBinding('class.is-valid') get isValid(): boolean {
    const control = this.getControl();

    if (!control) {
      return false;
    }
    return control.valid && (control.dirty || control.touched || this.formDirective?.submitted);
  }

  public constructor(
    @Optional() private formDirective: FormGroupDirective,
  ) {
  }

  private getControl(): AbstractControl | null {
    return this.formDirective.control.get(this.formControlName);
  }
}
