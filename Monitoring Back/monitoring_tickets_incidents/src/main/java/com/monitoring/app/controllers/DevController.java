package com.monitoring.app.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monitoring.app.entities.Developpeur;
import com.monitoring.app.services.DeveloppeurService;

@RestController
@RequestMapping("/dev")
@CrossOrigin(origins = "http://localhost:4200")
public class DevController {
	private DeveloppeurService developpeurService ;

	public DevController(DeveloppeurService developpeurService) {
		super();
		this.developpeurService = developpeurService;
	}
	@GetMapping("/all")
	public List<Developpeur> getAllDevs(){
		return developpeurService.findAll();
	}
	@GetMapping("/activeDevs")
	public List<Developpeur> getAllActiveDevs(){
		return developpeurService.getActiveDevs();
	}
	@GetMapping("/devByName/{name}")
	public ResponseEntity<Developpeur> getDevByName(@PathVariable String name) {
	    Developpeur dev = developpeurService.findMatrByUsername(name);
	    if (dev == null) {
	        return ResponseEntity.notFound().build();
	    }
	    return ResponseEntity.ok(dev);
	}


}

