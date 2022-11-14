import { Pipe, PipeTransform } from '@angular/core';

/*
* Get control required error message
* */
@Pipe({
  name: 'requiredError',
})
export class RequiredErrorPipe implements PipeTransform {
  public transform(value: string): string {
    return `The ${value} is required.`;
  }
}
