import { Todo } from '../shared/interfaces/todo';
import { TodoForm } from './todo-form';

/*
* Convert value from to-do from to to-do interface
* */
export function convertTodoFormToTodo(model: TodoForm): Todo {
  return {
    title: model.title,
    priority: model.priority,
    done: model.done,
    date: new Date(model.date).getTime(),
  };
}
