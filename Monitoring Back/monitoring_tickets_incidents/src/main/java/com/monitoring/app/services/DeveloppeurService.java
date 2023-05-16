package com.monitoring.app.services;

import java.util.List;

import com.monitoring.app.entities.Developpeur;
import com.monitoring.app.entities.Ticket;

public interface DeveloppeurService {
	
	void updateStatus (String status, long id_tic);
	 
	 List<Ticket> findAll_byIdDev(Long id);
	 
	 Developpeur findMatrByUsername(String nom);
	 
	 List<Developpeur> findAll();
	 
	 List<Developpeur>getActiveDevs();
}
