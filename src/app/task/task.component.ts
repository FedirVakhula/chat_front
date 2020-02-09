import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ITask } from '../models/models';
import { TasksService } from '../service/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public show = true;
  public showInput = false;

  @Input() task: ITask;
  @Input() parentId: string;
  @Output() delete: EventEmitter<ITask> = new EventEmitter<ITask>();

  @ViewChild('inputComments') inputComments: ElementRef;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  }

  public deleteTask (): void {
    this.delete.emit(this.task);
  }

  public editTask(): void {
    this.show = false;
  }

  public onSave(value): void {
    this.task.name = value;
    const body = {
      parentId: this.parentId,
      task: this.task
    };
    this.tasksService.upDateTask(this.task._id, body);
    this.show = true;
  }

  public onLike(): void {
    const body = {
      parentId: this.parentId,
      task: this.task
    };
    this.tasksService.upDateLike(this.task._id, body);
  }

  public onDislike(): void {
    const body = {
      parentId: this.parentId,
      task: this.task
    };
    this.tasksService.upDateDislike(this.task._id, body);
  }

  public addComments(): void {
    this.showInput = true;
  }

  public saveComments(): void {
    const task = {
      name: this.inputComments.nativeElement.value,
      comments: [],
      like: 0,
      dislike: 0
    };
    const body = {
      parentId: this.parentId,
      comment: task
    };
    this.inputComments.nativeElement.value = '';
    this.showInput = false;
    this.tasksService.upDateMessage(this.task._id, body);
  }
}
