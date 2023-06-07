package com.monitoring.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.monitoring.app.entities.Application;

public interface ApplicationRepo extends JpaRepository<Application, Long> {

	@Query("SELECT DISTINCT A.nom FROM Application A")
	List<String> getAllNames();
	//@Query("SELECT DISTINCT A.nom FROM Application A,Ticket t where t.application_id=A.application_id and t.developpeur_id= :id")

}
