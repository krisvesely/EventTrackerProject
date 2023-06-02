package com.skilldistillery.archi.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProjectTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Project project;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAArchi");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		project = em.find(Project.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		project = null;
	}

	@Test
	void test_Project_has_Mappings() {
		assertNotNull(project);
		assertNotNull(project.getId());
		assertEquals(1001, project.getReferenceNumber());
		assertEquals("Our Own Home Renovation", project.getTitle());
		assertEquals("Ourselves", project.getClient());
	}

}
