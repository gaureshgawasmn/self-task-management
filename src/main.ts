import { bootstrapApplication } from '@angular/platform-browser';

import { InjectionToken } from '@angular/core';
import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';

// bootstrapApplication(AppComponent).catch((err) => console.error(err));

// another way to creation injection using config and token
export const TaskServiceToken = new InjectionToken<TasksService>(
  'task-service-token'
);
bootstrapApplication(AppComponent, {
  providers: [{ provide: TaskServiceToken, useClass: TasksService }],
}).catch((err) => console.error(err));

// by doing above you can now access the task-service using inject(TaskServiceToken) instead
