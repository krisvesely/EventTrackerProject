import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  url: string = environment.baseUrl + 'api/projects';

  private projects: Project[] = [];

  index(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'ProjectService.index(): error retrieving projects: ' + err
            )
        );
      })
    );
  }

  show(refNum: number): Observable<Project> {
    return this.http.get<Project>(this.url + '/' + refNum).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('ProjectService.show(): error retrieving project: ' + err)
        );
      })
    );
  }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url, project).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () =>
            new Error('ProjectService.create(): error creating Todo: ' + err)
        );
      })
    );
  }

  update(editTodo: Project): Observable<Project> {
    return this.http.put<Project>(this.url + '/' + editTodo.referenceNumber, editTodo).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () =>
            new Error('ProjectService.update(): error updating project: ' + err)
        );
      })
    );
  }

  destroy(refNum: number): Observable<void> {
    return this.http.delete<void>(this.url +'/'+ refNum);
  }

}
