import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

    ngOnInit(): void {
      this.loadProjects();
    }

    loadProjects():void {
      this.projectService.index().subscribe({
      next: (projectList) => {
        this.projects = projectList;
      },
      error: function (theError) {
        console.error('HomeComponent.reload(): Error loading project list.');
        console.error(theError);
      },
    });
    }

}
