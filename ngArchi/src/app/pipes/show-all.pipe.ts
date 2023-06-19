import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'showAll'
})
export class ShowAllPipe implements PipeTransform {

  transform(projects: Project[], showInactive: boolean): Project[] {
    let displayProjects: Project[] = [];
    if (showInactive) {
      displayProjects = [...projects];
    }
    else {
      projects.forEach(project => {
        if (project.isActive) {
          displayProjects.push(project);
        }
      });
    }
    return displayProjects;
  }

}
