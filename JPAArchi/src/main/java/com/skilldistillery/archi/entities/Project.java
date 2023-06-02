package com.skilldistillery.archi.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Project {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="reference_number")
	private int referenceNumber;
	
	private String title;
	
	private String client;

	public Project() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getReferenceNumber() {
		return referenceNumber;
	}

	public void setReferenceNumber(int referenceNumber) {
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

	@Override
	public String toString() {
		return "Project [id=" + id + ", referenceNumber=" + referenceNumber + ", title=" + title + ", client=" + client
				+ "]";
	}
	
	

}
