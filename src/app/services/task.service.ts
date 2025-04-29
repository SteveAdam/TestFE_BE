import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  private readonly API_URL = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {
    this.loadTasksFromApi();
  }

  private loadTasksFromApi() {
    this.http.get<Task[]>(this.API_URL).subscribe({
      next: (tasks) => {
        // Convert string "true"/"false" to boolean if needed
        const normalizedTasks = tasks.map(task => ({
          ...task,
          status: typeof task.status === 'string' ? task.status === 'true' : task.status
        }));
        this.tasksSubject.next(normalizedTasks);
      },
      error: (err) => console.error('Failed to load tasks', err)
    });
  }

  addTask(task: Task) {
    const taskWithoutId = { ...task };
    delete taskWithoutId.id;
    taskWithoutId.status = !!task.status; // Ensure boolean
    this.http.post<Task>(this.API_URL, taskWithoutId).subscribe({
      next: () => this.loadTasksFromApi(),
      error: (err) => console.error('Failed to add task', err)
    });
  }

  updateTask(updatedTask: Task) {
    const normalizedTask = { ...updatedTask, status: !!updatedTask.status };
    this.http.put(`${this.API_URL}/${updatedTask.id}`, normalizedTask).subscribe({
      next: () => this.loadTasksFromApi(),
      error: (err) => console.error('Failed to update task', err)
    });
  }

  deleteTask(id: string) {
    this.http.delete(`${this.API_URL}/${id}`).subscribe({
      next: () => this.loadTasksFromApi(),
      error: (err) => console.error('Failed to delete task', err)
    });
  }

  toggleStatus(id: string, status: boolean) {
    const currentTasks = this.tasksSubject.getValue();
    const task = currentTasks.find(t => t.id === id);
    if (task) {
      const updatedTask = { ...task, status: !!status };
      this.updateTask(updatedTask);
    }
  }

  getTaskById(id: string): Task | undefined {
    return this.tasksSubject.getValue().find(task => task.id === id);
  }

  getTasksSnapshot() {
    return this.tasksSubject.getValue();
  }
}
