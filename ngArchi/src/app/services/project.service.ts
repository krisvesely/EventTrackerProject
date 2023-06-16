import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

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

}
