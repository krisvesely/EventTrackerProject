package com.skilldistillery.archi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.archi.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
	
	Project findById(int id);
}
