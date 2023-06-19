package com.skilldistillery.archi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.archi.entities.Project;
import com.skilldistillery.archi.repositories.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {
	
	@Autowired
	private ProjectRepository projectRepo;

	@Override
	public List<Project> findAll() {
		return projectRepo.findAllByOrderByReferenceNumberAsc();
	}
	
	@Override
	public List<Project> findByActiveStatus() {
		return projectRepo.findByIsActiveTrue();
	}

	@Override
	public Project findById(int projectId) {
		if (!projectRepo.existsById(projectId)) {
			return null;
		}
		Project project = projectRepo.findById(projectId);
		return project;
	}
	
	@Override
	public Project findByRefNum(int refNum) {
		try {
		Project project = projectRepo.findByReferenceNumber(refNum);
		return project;
		}
		catch (Exception e) {
			return null;
		}
	}

	@Override
	public Project create(Project newProject) {
		Project addedProject = projectRepo.saveAndFlush(newProject);
		return addedProject;
	}

	@Override
	public Project update(int refNum, Project updatingProject) {
		try {
			Project managedProject = projectRepo.findByReferenceNumber(refNum);
			
			if (managedProject.getReferenceNumber() != updatingProject.getReferenceNumber()) {
				managedProject.setReferenceNumber(updatingProject.getReferenceNumber());
			}
			managedProject.setTitle(updatingProject.getTitle());
			managedProject.setClient(updatingProject.getClient());
			managedProject.setIsActive(updatingProject.getIsActive());
			managedProject.setContractPhase(updatingProject.getContractPhase());
			managedProject.setWorkingPhase(updatingProject.getWorkingPhase());
			managedProject.setPhaseStatus(updatingProject.getPhaseStatus());
			managedProject.setFee(updatingProject.getFee());
			managedProject.setNote(updatingProject.getNote());
			managedProject = projectRepo.saveAndFlush(managedProject);
			return managedProject;
		}
		catch (Exception e) {
			return null;
		}

	}

//	@Override
//	public boolean delete(int projectId) {
//		if (!projectRepo.existsById(projectId)) {
//			return false;
//		}
//		projectRepo.deleteById(projectId);
//		if (!projectRepo.existsById(projectId)) {
//			return true;
//		}
//		else {
//			return false;
//		}
//	}
	
	@Override
	public boolean delete(int refNum) {
		try {
			Project projectToDelete = projectRepo.findByReferenceNumber(refNum);
			projectRepo.deleteById(projectToDelete.getId());
			if (!projectRepo.existsById(projectToDelete.getId())) {
				return true;
			}
			else {
				return false;
			}
		}
		catch (Exception e) {
			return false;
		}

	}

}
