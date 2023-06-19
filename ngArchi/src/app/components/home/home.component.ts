import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectComponent } from '../project/project.component';
import { ShowAllPipe } from 'src/app/pipes/show-all.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  projects: Project[] = [];
  selected: Project | null = null;
  newProject: Project = new Project();
  editProject: Project | null = null;
  showInactive: boolean = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private showAllPipe: ShowAllPipe
  ) {}

  ngOnInit(): void {
    let refNumStr = this.route.snapshot.paramMap.get('refNum');
    if (!this.selected && refNumStr) {
      let refNum: number = Number.parseInt(refNumStr);
      if (isNaN(refNum)) {
        this.router.navigateByUrl('**');
      } else {
        this.projectService.show(refNum).subscribe({
          next: (project) => {
            this.selected = project;
          },
          error: (theError) => {
            console.error('HomeComponent.ngOnInit(): Error loading project.');
            console.error(theError);
            this.router.navigateByUrl('**');
          },
        });
      }
    } else {
      this.loadProjects();
    }
  }

  loadProjects(): void {
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

  displayProjectList() {
    this.router.navigateByUrl('projects');
    this.selected = null;
  }

  getProjectCount(): number {
    return this.showAllPipe.transform(this.projects, false).length;
  }

  displayProject(selectedProject: Project) {
    this.router.navigateByUrl('projects/' + selectedProject.referenceNumber);
    this.selected = selectedProject;
  }

  addProject(newProject: Project): void {
    console.log(newProject);
    this.projectService.create(newProject).subscribe({
      next: (result) => {
        this.newProject = new Project();
        this.loadProjects();
        this.selected = result;
      },
      error: (nojoy) => {
        console.error('TodoListHttpComponent.addTodo(): error creating Todo:');
        console.error(nojoy);
      },
    });
    // this.todoSvc.create(newTodo);
    // this.reload();
    // this.newTodo = new Todo();
  }

  setEditProject() {
    this.editProject = Object.assign({}, this.selected); //should stay
  }

  cancelEdit() {
    this.editProject = null;
  }

  updateProjectIsActive(editProject: Project): void {
    console.log(editProject);
    this.projectService.update(editProject).subscribe({
      next: (result) => {
        this.editProject = null;
        this.selected = null;
        this.loadProjects();
              },
      error: (nojoy) => {
        console.error(
          'HomeComponent.updateProject(): error updating project:'
        );
        console.error(nojoy);
      },
    });
  }

  updateProject(editProject: Project): void {
    console.log(editProject);
    this.projectService.update(editProject).subscribe({
      next: (result) => {
        this.editProject = null;
        this.loadProjects();
        this.selected = result;
      },
      error: (nojoy) => {
        console.error(
          'HomeComponent.updateProject(): error updating project:'
        );
        console.error(nojoy);
      },
    });
  }

  deleteProject(refNum: number) {
    this.projectService.destroy(refNum).subscribe({
      next: (result) => {
        this.loadProjects();
      },
      error: (nojoy) => {
        console.error(
          'TodoListHttpComponent.deleteTodo(): error deleting Todo:'
        );
        console.error(nojoy);
      },
    });
  }





}
