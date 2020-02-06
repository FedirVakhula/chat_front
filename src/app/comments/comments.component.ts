import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../models/models';
import { TasksService } from '../service/tasks.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() messageTask: ITask;
  public index: number;

  constructor(private taskservice: TasksService) { }

  ngOnInit() { }

  public addMessage(message: string): void {
    this.messageTask.comments.push(message);
    this.taskservice.upDateMessage(this.messageTask._id.toString(), this.messageTask);
  }

}
