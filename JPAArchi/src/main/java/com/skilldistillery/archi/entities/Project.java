package com.skilldistillery.archi.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Project {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="reference_number")
	private Integer referenceNumber;
	
	private String title;
	
	private String client;
	
	@Column(name="is_active")
	private Boolean isActive;
	
	@Column(name="contract_phase")
	private String contractPhase;
	
	@Column(name="working_phase")
	private String workingPhase;
	
	@Column(name="phase_status")
	private String phaseStatus;
	
	private Double fee;
	
	@Column(name="created_at")
	@CreationTimestamp
	private LocalDateTime createdAt;

	@Column(name="updated_at")
	@UpdateTimestamp
	private LocalDateTime updatedAt;
	
	private String note;

	public Project() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getReferenceNumber() {
		return referenceNumber;
	}

	public void setReferenceNumber(Integer referenceNumber) {
		this.referenceNumber = referenceNumber;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public String getContractPhase() {
		return contractPhase;
	}

	public void setContractPhase(String contractPhase) {
		this.contractPhase = contractPhase;
	}

	public String getWorkingPhase() {
		return workingPhase;
	}

	public void setWorkingPhase(String workingPhase) {
		this.workingPhase = workingPhase;
	}

	public String getPhaseStatus() {
		return phaseStatus;
	}

	public void setPhaseStatus(String phaseStatus) {
		this.phaseStatus = phaseStatus;
	}

	public Double getFee() {
		return fee;
	}

	public void setFee(Double fee) {
		this.fee = fee;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	@Override
	public String toString() {
		return "Project [id=" + id + ", referenceNumber=" + referenceNumber + ", title=" + title + ", client=" + client
				+ ", isActive=" + isActive + ", contractPhase=" + contractPhase + ", workingPhase=" + workingPhase
				+ ", phaseStatus=" + phaseStatus + ", fee=" + fee + ", createdAt=" + createdAt + ", updatedAt="
				+ updatedAt + ", note=" + note + "]";
	}

	
	

}
