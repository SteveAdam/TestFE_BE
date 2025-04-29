import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification-component/notification-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.scss']
})
export class TaskListComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: 'all' | 'completed' | 'pending' = 'all';
  searchQuery: any;

  constructor(private taskService: TaskService, private router: Router) {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilter();
    });
  }

  addTask() {
    this.router.navigate(['/add-task']);
  }

  editTask(task: Task) {
    this.router.navigate(['/edit-task', task.id]);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  changeStatus(task: Task, status: boolean) {
    if (task.id !== undefined) {
      this.taskService.toggleStatus(task.id, status);
    }
  }

  applyFilter() {
    if (this.filter === 'completed') {
      this.filteredTasks = this.tasks.filter(t => t.status);
    } else if (this.filter === 'pending') {
      this.filteredTasks = this.tasks.filter(t => !t.status);
    } else {
      this.filteredTasks = this.tasks;
    }
  }
  searchTasks(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    if (lowerCaseSearchTerm) {
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        (task.description?.toLowerCase().includes(lowerCaseSearchTerm) ?? false)
      );
    } else {
      this.applyFilter();
    }
  }
}