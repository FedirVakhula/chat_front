import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITask } from '../models/models';
import { TasksService } from '../service/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
  public tasks: ITask[] = [];

  private tasksSubscribtion: Subscription;

  constructor(private taskservice: TasksService) { }

  ngOnInit() {
    this.tasksSubscribtion = this.taskservice.tasks$.subscribe((tasks: ITask[]) => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy() {
    this.tasksSubscribtion.unsubscribe();
  }

  public addTask(inputvalue: string, inputauthor: string): void {
    const task: ITask = { name: inputvalue, author: inputauthor, comments: [], like: 0, dislike: 0};
    this.tasks.push(task);
    this.taskservice.setTasks(task);
  }

  public onDelete(task: ITask): void {
    this.taskservice.deleteTask(task._id);
  }

  public onSave(task: ITask): void {
    this.taskservice.upDateTask(task._id.toString(), task);
  }

}
