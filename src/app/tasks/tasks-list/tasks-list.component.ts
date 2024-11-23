import { Component, inject, signal } from '@angular/core';

import { TaskServiceToken } from '../../../main';
import { TASK_STATUS_OPTIONS, TaskStatusOptionsProvider } from '../task.model';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [TaskStatusOptionsProvider],
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');

  // private tasksService = inject(TasksService);
  private tasksService = inject(TaskServiceToken);

  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  get tasks() {
    return this.tasksService.getTask(this.selectedFilter());
  }

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
