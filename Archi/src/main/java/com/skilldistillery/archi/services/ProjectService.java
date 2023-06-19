package com.skilldistillery.archi.services;

import java.util.List;

import com.skilldistillery.archi.entities.Project;

public interface ProjectService {
	
	List<Project> findAll();
	List<Project> findByActiveStatus();
	Project findById(int projectId);
	Project findByRefNum(int refNum);
	Project create(Project newProject);
	Project update(int refNum, Project updatingProject);
	boolean delete(int refNum);

}
