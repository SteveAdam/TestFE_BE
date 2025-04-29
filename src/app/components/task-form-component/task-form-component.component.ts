import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form-component.component.html',
  styleUrls: ['./task-form-component.component.scss']
})
export class TaskFormComponent {
  task: Partial<Task> = {};
  isEdit = false;
  today: any;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existingTask = this.taskService.getTaskById(+id);
      if (existingTask) {
        this.task = { ...existingTask };
        this.isEdit = true;
      }
    }
  }
  

  submitForm() {
    if (this.isEdit && this.task.id != null) {
      this.taskService.updateTask(this.task as Task);
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title: this.task.title!,
        description: this.task.description || '',
        dueDate: this.task.dueDate || new Date(),
        status: this.task.status ?? false,
      };
      this.taskService.addTask(newTask);
    }
    alert('Task saved successfully!');
    this.router.navigate(['/tasks']);
  }
}
