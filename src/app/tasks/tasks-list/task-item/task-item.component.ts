import { Component, computed, inject, Inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TaskServiceToken } from '../../../../main';
import { Task, TASK_STATUS_OPTIONS } from '../../task.model';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  task = input.required<Task>();
  // private tasksService = inject(TasksService);

  // constructor(private tasksService: TasksService) {}

  constructor(@Inject(TaskServiceToken) private tasksService: TasksService) {}
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  
  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(taskId: string, status: string) {
    this.tasksService.updateTaskStatus(taskId, status);
  }
}
