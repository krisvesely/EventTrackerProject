package com.skilldistillery.archi.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.archi.entities.Project;
import com.skilldistillery.archi.services.ProjectService;

@RestController
@RequestMapping("api")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@GetMapping("projects")
	public List<Project> showProjects() {
		return projectService.findAll();
	}
	
	@GetMapping("projects/{id}")
	public Project showProjectById(HttpServletResponse res, @PathVariable("id") int projectId) {
		Project project = projectService.findById(projectId);
		if (project == null) {
			res.setStatus(404);
		}
		return project;
	}
	
	@GetMapping("projects/active")
	public List<Project> showActiveProjects(HttpServletResponse res) {
		List<Project> projects = projectService.findByActiveStatus();
		if (projects == null) {
			res.setStatus(404);
		}
		System.out.println(projects);
		return projects;
	}
	
	@PostMapping("projects")
	public Project create(HttpServletResponse res, HttpServletRequest req, @RequestBody Project newProject) {
		try {
			newProject = projectService.create(newProject);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(newProject.getId());
			res.setHeader("Location", url.toString());
		}
		catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			newProject = null;
		}
		return newProject;
	}
	
	@PutMapping("projects/{id}")
	public Project replace(HttpServletResponse res, @PathVariable("id") int projectId, @RequestBody Project updatingProject) {
		try {
			updatingProject = projectService.update(projectId, updatingProject);
			if (updatingProject == null) {
				res.setStatus(404);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			updatingProject = null;
		}
		return updatingProject;
	}
	
	@DeleteMapping("projects/{id}")
	public void delete(HttpServletResponse res, @PathVariable("id") int projectId) {
		if (projectService.delete(projectId)) {
			res.setStatus(204);
		}
		else {
			res.setStatus(404);
		}
	}

}
