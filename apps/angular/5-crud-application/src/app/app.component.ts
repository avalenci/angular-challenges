import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ToDo } from './interfaces/ToDo';
import { ToDoService } from './services/to-do.service';

@Component({
  imports: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private toDoService = inject(ToDoService);

  todos: WritableSignal<ToDo[]> = signal([]);

  ngOnInit(): void {
    this.toDoService.getToDos().subscribe((todos: ToDo[]) => {
      this.todos.set(todos);
    });
  }

  update(todo: ToDo) {
    this.toDoService.updateToDo(todo).subscribe((todoUpdated: any) => {
      this.todos.update((todos) => {
        const temp = [...todos];
        temp[todoUpdated.id - 1] = todoUpdated;
        return temp;
      });
    });
  }

  delete(todoId: number) {
    this.toDoService.deleteToDo(todoId).subscribe(() => {
      this.todos.update((todos) => {
        return todos.filter((todo: ToDo) => todo.id !== todoId);
      });
    });
  }
}
