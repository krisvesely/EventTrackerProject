package com.skilldistillery.archi.services;

import java.util.List;

import com.skilldistillery.archi.entities.Project;

public interface ProjectService {
	
	List<Project> findAll();
	Project findById(int projectId);
	Project create(Project newProject);
	Project update(int projectId, Project updatingProject);
	boolean delete(int projectId);

}