import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../models/models';
import { TasksService } from '../service/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public show = true;

  @Input() task: ITask;
  @Output() delete: EventEmitter<ITask> = new EventEmitter<ITask>();
  @Output() save: EventEmitter<ITask> = new EventEmitter<ITask>();
  @Output() idTask: EventEmitter<number> = new EventEmitter<number>();

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
    this.save.emit(this.task);
    this.show = true;
  }

  public sendId (): void {
    this.idTask.emit(this.task._id);
  }

  public onLike(): void {
    this.tasksService.upDateLike(this.task._id.toString(), this.task);
  }

  public onDislike(): void {
    this.tasksService.upDateDislike(this.task._id.toString(), this.task);
  }
}
