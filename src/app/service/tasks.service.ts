import { Injectable } from '@angular/core';
import { ITask } from '../models/models';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public deleteTask$ = new Subject();
  public tasks$ = new ReplaySubject(1);
  public tasks: ITask[] = [];

  constructor(private http: HttpClient) { this.init(); }

  private init() {
    this.getTasks().subscribe((tasks: ITask[]) => {
      this.tasks$.next(tasks);
    });
  }

  public getTasks () {
    return this.http.get('https://dry-island-39107.herokuapp.com/coments');
  }

  public setTasks (task: ITask): void {
    this.http.post('https://dry-island-39107.herokuapp.com/coments/add', task)
      .subscribe((tasks) => {
        this.tasks$.next(tasks);
      });
  }

  public upDateTask(id: string, body: ITask): void {
    this.http.patch(`https://dry-island-39107.herokuapp.com/coments/${id}`, body).subscribe((tasks) => {
      this.tasks$.next(tasks);
    });
  }

  public upDateMessage(id: string, body: ITask): void {
    this.http.patch(`https://dry-island-39107.herokuapp.com/coments/add/${id}`, body).subscribe((tasks) => {
      this.tasks$.next(tasks);
    });
  }

  public upDateLike(id: string, body: ITask): void {
    this.http.patch(`https://dry-island-39107.herokuapp.com/coments/like/${id}`, body).subscribe((tasks) => {
      this.tasks$.next(tasks);
    });
  }

  public upDateDislike(id: string, body: ITask): void {
    this.http.patch(`https://dry-island-39107.herokuapp.com/coments/dislike/${id}`, body).subscribe((tasks) => {
      this.tasks$.next(tasks);
    });
  }

  public deleteTask(id: string): void {
    this.http.delete(`https://dry-island-39107.herokuapp.com/coments/${id}`).subscribe((tasks) => {
        this.tasks$.next(tasks);
    });
  }

  public getTask (id: number): Observable<ITask> {
    return this.getTasks().pipe(map((tasks: ITask[]) => {
      return tasks.find((data: ITask) => data._id === id);
    }));
  }
}
