import { inject, signal } from '@angular/core';
import { LoggingService } from '../logging.service';
import { Task, TaskStatus } from './task.model';

// @Injectable({
//   providedIn: 'root',
// })
// commenting above as we have added custom injection in main.ts
export class TasksService {
  tasks = signal<Task[]>([]);
  private logService = inject(LoggingService);

  constructor() {
    this.tasks().push({
      id: new Date().toISOString() + 1,
      title: 'Master Angular',
      description:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      status: 'IN_PROGRESS',
    });

    this.tasks().push({
      id: new Date().toISOString() + 2,
      title: 'Build first prototype',
      description: 'Build a first prototype of the online shop website',
      status: 'OPEN',
    });

    this.tasks().push({
      id: new Date().toISOString() + 3,
      title: 'Prepare issue template',
      description:
        'Prepare and describe an issue template which will help with project management',
      status: 'DONE',
    });

    this.tasks().push({
      id: new Date().toISOString() + 4,
      title: 'Deploy Angular application to Firebase',
      description:
        'Deploy the Angular application to Firebase Hosting for live production.',
      status: 'OPEN',
    });

    this.logService.log('Initialize the tasks successfully!');
  }

  addTask(taskData: { title: string; description: string }) {
    // this.tasks().push({
    //   id: new Date().toISOString(),
    //   title: title,
    //   description: description,
    //   status: 'OPEN',
    // });
    // using update on tasks signal
    this.tasks.update((oldTasks) => [
      ...oldTasks,
      {
        ...taskData,
        id: new Date().toISOString(),
        status: 'OPEN',
      },
    ]);
  }

  getTask(selectedFilter: string) {
    if (selectedFilter === 'all') {
      return this.tasks();
    }
    const status = this.getStatus(selectedFilter);
    return this.tasks().filter((task) => task.status === status);
  }

  updateTaskStatus(taskId: string, status: string) {
    const finalStatus = this.getStatus(status);
    // this.tasks.set(
    //   this.tasks().map((task) => {
    //     if (task.id === taskId) {
    //       return { ...task, status: finalStatus };
    //     }
    //     return task;
    //   })
    // );
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: finalStatus } : task
      )
    );
  }

  private getStatus(status: string): TaskStatus {
    let newStatus: TaskStatus = 'OPEN';

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }
    return newStatus;
  }
}
