import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, noop } from 'rxjs';
import { AppService } from '../app.service';
import { GlobalSpinnerStore } from '../shared/components/global-spinner/global-spinner.store';
import { TodoPriority } from '../shared/enums/todo-priority';
import { ControlsOf } from '../shared/types/controls-of';
import { TodoForm } from './todo-form';
import { convertTodoFormToTodo } from './todo-form-to-todo.converter';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  public readonly priorities = TodoPriority;
  public readonly form: FormGroup<ControlsOf<TodoForm>>;

  public constructor(
    private appService: AppService,
    private router: Router,
    private globalSpinner: GlobalSpinnerStore,
  ) {
    this.form = this.defineForm();
  }

  public submitForm(): void {
    //Stop if form invalid
    if (this.form.invalid) {
      return;
    }

    //Show global spinner
    this.globalSpinner.show();

    this.appService.createTodo(
      convertTodoFormToTodo(this.form.getRawValue()),
    ).pipe(
      //Hide global spinner when saves success or has an error
      finalize(() => this.globalSpinner.hide()),
    ).subscribe({
      next: () => {
        //navigate to to-do list after save success
        this.router.navigate(['/']).then(noop);
      },
    });
  }

  private defineForm(): FormGroup<ControlsOf<TodoForm>> {
    return new FormGroup<ControlsOf<TodoForm>>({
      title: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      date: new FormControl<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en'), {
        nonNullable: true,
        validators: [Validators.required],
      }),
      done: new FormControl<boolean>(false, {
        nonNullable: true,
      }),
      priority: new FormControl<TodoPriority>(TodoPriority.LOW, {
        nonNullable: true,
      }),
    });
  }
}
