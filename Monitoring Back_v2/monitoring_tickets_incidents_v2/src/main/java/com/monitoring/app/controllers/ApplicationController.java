package com.monitoring.app.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monitoring.app.entities.Application;
import com.monitoring.app.entities.Developpeur;
import com.monitoring.app.repositories.ApplicationRepo;
import com.monitoring.app.services.ApplicationService;

@RestController
@RequestMapping("/app")
@CrossOrigin(origins = "http://localhost:4200")
public class ApplicationController {

	private ApplicationService applicationService;
	private ApplicationRepo applicationRepo;

	public ApplicationController(ApplicationService applicationService, ApplicationRepo applicationRepo) {
		super();
		this.applicationService = applicationService;
		this.applicationRepo = applicationRepo;
	}
	
	@GetMapping("/getAllApps")
	public List<String> getAllApps(){
		return applicationRepo.getAllNames();
	}
	
}
