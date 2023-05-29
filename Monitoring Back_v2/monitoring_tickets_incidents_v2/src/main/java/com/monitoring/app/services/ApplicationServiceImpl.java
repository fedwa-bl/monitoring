package com.monitoring.app.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.monitoring.app.entities.Application;
import com.monitoring.app.repositories.ApplicationRepo;

@Service
public class ApplicationServiceImpl implements ApplicationService {

	private ApplicationRepo applicationRepo;
	
	
	
	public ApplicationServiceImpl(ApplicationRepo applicationRepo) {
		super();
		this.applicationRepo = applicationRepo;
	}

	@Override
	public List<Application> allApps() {
		return applicationRepo.findAll();
	}
	
}
