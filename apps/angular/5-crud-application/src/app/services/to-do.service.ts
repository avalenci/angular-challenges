import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { ToDo } from '../interfaces/ToDo';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl);
  }

  updateToDo(todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(
      `${this.apiUrl}/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        body: todo.body,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  deleteToDo(todoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${todoId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  logMessage(message: string): void {
    console.log(`Service message: ${message}`);
  }
}
