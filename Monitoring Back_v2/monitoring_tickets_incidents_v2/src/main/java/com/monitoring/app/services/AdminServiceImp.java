package com.monitoring.app.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.monitoring.app.entities.Admin;
import com.monitoring.app.entities.Developpeur;
import com.monitoring.app.entities.Ticket;
import com.monitoring.app.entities.Ticket.Criticite;
import com.monitoring.app.entities.Ticket.Status;
import com.monitoring.app.repositories.AdminRepo;
import com.monitoring.app.repositories.DeveloppeurRepo;
import com.monitoring.app.repositories.EdsRepo;
import com.monitoring.app.repositories.TicketRepo;

@Service
public class AdminServiceImp implements AdminService{

private DeveloppeurRepo developpeurRepo;
private AdminRepo adminRepo;
private TicketRepo ticketRepo;
private EdsRepo edsRepo;

public AdminServiceImp(DeveloppeurRepo developpeurRepo,AdminRepo adminRepo,TicketRepo ticketRepo, EdsRepo edsRepo) {
	super();
	this.developpeurRepo = developpeurRepo;
	this.adminRepo=adminRepo;
	this.ticketRepo=ticketRepo;
	this.edsRepo=edsRepo;
}

	@Override
	public Developpeur ajouterDev(Developpeur dev) {
		return developpeurRepo.save(dev);
	}
	
	@Override
	public List<Developpeur> allDevs() {
		return developpeurRepo.findAll();
	}
	@Override
	public Developpeur updateDev(Developpeur dev) {
		Optional<Developpeur> existingDevOptional = developpeurRepo.findById(dev.getId());
	    if (existingDevOptional.isPresent()) {
	        Developpeur existingDev = existingDevOptional.get();
	        existingDev.setNom(dev.getNom());
	        existingDev.setPrenom(dev.getPrenom());
	        existingDev.setTele(dev.getTele());
	        existingDev.setUsername(dev.getUsername());
	        existingDev.setEmail(dev.getEmail());
	        existingDev.setMatrDev(dev.getMatrDev());
	        return developpeurRepo.save(existingDev);
	    } else {
	      
	        return null;
	    }
	}
	@Override
	public void deleteDev(Long id) {
		Optional<Developpeur> devOptional = developpeurRepo.findById(id);
	    if (devOptional.isPresent()) {
	        Developpeur dev = devOptional.get();
	        developpeurRepo.delete(dev);
	    } else {
	        
	    }
		
	}
	public Optional<Developpeur> findDevById(Long id) {
		return developpeurRepo.findById(id);
	}
	@Override
	public Optional<Developpeur> findDevByCuid(String cuid) {
		return developpeurRepo.findByMatrDev(cuid);
	}
	@Override
	public List<Ticket> findTicketsNonAttr() {
		return (List<Ticket>) adminRepo.findTicketsNonAttr();
	}

	//test
	@Override
	public Ticket ajouterTicket(Ticket ticket) {
		if(ticket.getCriticite()==Criticite.URGENT) {
			ticket.setDurée(4);
			ticket.setDate_fin(new Date(System.currentTimeMillis() + ticket.getDurée() * 24 * 60 * 60 * 1000));
		}
		else if(ticket.getCriticite()==Criticite.CRITIQUE) {
			ticket.setDurée(7);
			ticket.setDate_fin(new Date(System.currentTimeMillis() + ticket.getDurée() * 24 * 60 * 60 * 1000));
		}
		else if(ticket.getCriticite()==Criticite.NORMAL) {
			ticket.setDurée(10);
			ticket.setDate_fin(new Date(System.currentTimeMillis() + ticket.getDurée() * 24 * 60 * 60 * 1000));
		}
		return ticketRepo.save(ticket);
	}

	@Override
	public Optional<Ticket> findTicketById(Long id) {
		
		return ticketRepo.findById(id);
	}
	@Override
	public Admin ajouterAdmin(Admin admin) {
		return adminRepo.save(admin);
	}

	@Override
	public List<Ticket> findTicketsAttr() {
		return (List<Ticket>) adminRepo.findTicketsAttr();
	}
	
	@Override
	public Ticket updateStatus(Status s, Long id) {
		try {
			Ticket ticket = ticketRepo.findById(id).get();
			if(ticket == null) {
				return null;
			}
			ticket.setStatus(s);
			return ticketRepo.save(ticket);
			
		}catch(Exception e) {
			return null;
		}
	}
	@Override
	public Ticket assignDev(Developpeur dev, Long id) {
		try {
			Ticket ticket = ticketRepo.findById(id).get();
			if(ticket == null) {
				return null;
			}
			ticket.setDeveloppeur(dev);
			ticket.setStatus(Status.OUVERT);
			dev.setNb_tickets_assignes(dev.getNb_tickets_assignes()+1);
			return ticketRepo.save(ticket);
			
		}catch(Exception e) {
			return null;
		}
	}

	@Override
	public Ticket reAssignDev(Developpeur dev, Long id) {
		try {
			Ticket ticket = ticketRepo.findById(id).get();
			if(ticket == null) {
				return null;
			}
			ticket.setDeveloppeur(dev);
			ticket.setStatus(Status.OUVERT);
			dev.setNb_tickets_assignes(dev.getNb_tickets_assignes()+1);
			ticket.setDate_creation(new Date());
			ticket.setDate_fin(new Date(System.currentTimeMillis() + ticket.getDurée() * 24 * 60 * 60 * 1000));
			return ticketRepo.save(ticket);
			
		}catch(Exception e) {
			return null;
		}
	}

	@Override
	public List<String> getEds() {
		return  (List<String>) edsRepo.findEds();
	}
}
