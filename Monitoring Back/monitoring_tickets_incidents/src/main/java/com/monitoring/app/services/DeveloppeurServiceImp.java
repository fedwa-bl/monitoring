package com.monitoring.app.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.monitoring.app.entities.Developpeur;
import com.monitoring.app.entities.Ticket;
import com.monitoring.app.repositories.DeveloppeurRepo;

@Service
public class DeveloppeurServiceImp implements DeveloppeurService{

private DeveloppeurRepo developpeurRepo;
	

	public DeveloppeurServiceImp(DeveloppeurRepo developpeurRepo) {
		super();
		this.developpeurRepo = developpeurRepo;
	}

	@Override
	public void updateStatus(String status, long id_tic) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Ticket> findAll_byIdDev(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Developpeur findMatrByUsername(String nom) {
		return developpeurRepo.findMatrByNom(nom);
	}

	@Override
	public List<Developpeur> findAll() {
		return developpeurRepo.findAll();
	}

	@Override
	public List<Developpeur> getActiveDevs() {
		return (List<Developpeur>) developpeurRepo.getActiveDevs();
	}


}
