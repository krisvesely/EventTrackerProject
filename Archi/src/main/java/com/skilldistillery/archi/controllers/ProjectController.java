package com.skilldistillery.archi.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@GetMapping("projects")
	public List<Project> showProjects() {
		return projectService.findAll();
	}
	
	@GetMapping("projects/{refNum}")
	public Project showProjectById(HttpServletResponse res, @PathVariable("refNum") int refNum) {
		Project project = projectService.findByRefNum(refNum);
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
	
	@PutMapping("projects/{refNum}")
	public Project replace(HttpServletResponse res, @PathVariable("refNum") int refNum, @RequestBody Project updatingProject) {
		try {
			updatingProject = projectService.update(refNum, updatingProject);
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
	
	@DeleteMapping("projects/{refNum}")
	public void delete(HttpServletResponse res, @PathVariable("refNum") int refNum) {
		if (projectService.delete(refNum)) {
			res.setStatus(204);
		}
		else {
			res.setStatus(404);
		}
	}

}
