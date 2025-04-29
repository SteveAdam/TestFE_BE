import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification-component.component.html',
  styleUrls: ['./notification-component.component.scss']
})
export class NotificationComponent {
  incompleteCount = 0;

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe(tasks => {
      this.incompleteCount = tasks.filter(t => !t.status).length;
    });
  }
}
