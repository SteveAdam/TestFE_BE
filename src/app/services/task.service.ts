import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  private readonly apiUrl = 'http://localhost:3000/tasks';
  
  constructor(private http: HttpClient) {
    this.loadTasksFromApi();
  }
  
  private loadTasksFromApi() {
    this.http.get<Task[]>(this.apiUrl).subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }
  
  addTask(task: Task) {
    this.http.post<Task>(this.apiUrl, task).pipe(
      tap(() => this.loadTasksFromApi())
    ).subscribe();
  }
  
  updateTask(updatedTask: Task) {
    this.http.put(`${this.apiUrl}/${updatedTask.id}`, updatedTask).pipe(
      tap(() => this.loadTasksFromApi())
    ).subscribe();
  }
  
  deleteTask(id: String) {
    this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadTasksFromApi())
    ).subscribe();
  }
  
  toggleStatus(id: String, status: boolean) {
    const task = this.tasksSubject.getValue().find(task => task.id === id.toString());
    if (task) {
      const updatedTask = { ...task, status };
      this.updateTask(updatedTask);
    }
  }
  
  getTasksSnapshot() {
    return this.tasksSubject.getValue();
  }
  
  getTaskById(id: number): Task | undefined {
    return this.tasksSubject.getValue().find(task => task.id === id.toString());
  }
}