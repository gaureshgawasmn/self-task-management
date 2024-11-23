import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskServiceToken } from '../../../main';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  constructor(@Inject(TaskServiceToken) private tasksService: TasksService) {}

  get titleIsInvalid() {
    return (
      this.form.controls.title.touched &&
      this.form.controls.title.dirty &&
      this.form.controls.title.invalid
    );
  }

  get descriptionIsInvalid() {
    return (
      this.form.controls.description.touched &&
      this.form.controls.description.dirty &&
      this.form.controls.description.invalid
    );
  }

  onAddTask() {
    console.log(this.form);
    if (this.form.invalid) {
      console.log('Invalid form');
      return;
    }

    this.tasksService.addTask({
      title: this.form.value.title!,
      description: this.form.value.description!,
    });
    this.form.reset();
  }

  resetForm() {
    this.form.reset();
  }
}
