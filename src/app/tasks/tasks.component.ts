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
  public messageTask: ITask = null;

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
    const task = { name: inputvalue, author: inputauthor, comments: [], like: 0, dislike: 0};
    this.tasks.push(task);
    this.taskservice.setTasks(task);
  }

  public onDelete(tasks): void {
    this.taskservice.deleteTask(tasks._id);
    this.messageTask = null;
  }

  public onSave(task: ITask): void {
    this.taskservice.upDateTask(task._id.toString(), task);
  }

  public message (id: number): void {
    this.taskservice.getTask(id).subscribe((task: ITask) => {
      this.messageTask = task;
    });
  }
}
