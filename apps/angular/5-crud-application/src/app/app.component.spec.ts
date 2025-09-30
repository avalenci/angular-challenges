import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ToDo } from './interfaces/ToDo';
import { ToDoService } from './services/to-do.service';

const TO_DO = { id: 1, title: 'todo', body: 'todo', userId: 'todo' };
const TO_DOS: ToDo[] = [TO_DO];

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let toDoService: ToDoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), ToDoService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    toDoService = TestBed.inject(ToDoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get todos', () => {
      // if
      const spyGet = jest
        .spyOn(toDoService, 'getToDos')
        .mockReturnValue(of(TO_DOS));
      const spySet = jest.spyOn(component.todos, 'set');

      // when
      component.ngOnInit();

      // then
      expect(spyGet).toHaveBeenCalled();
      expect(spySet).toHaveBeenCalledWith(TO_DOS);
    });
  });

  describe('update', () => {
    it('should update todos', () => {
      // if
      const spyUpdate = jest
        .spyOn(toDoService, 'updateToDo')
        .mockReturnValue(of(TO_DO));

      // when
      component.update(TO_DO);

      // then
      expect(spyUpdate).toHaveBeenCalledWith(TO_DO);
    });
  });
});
