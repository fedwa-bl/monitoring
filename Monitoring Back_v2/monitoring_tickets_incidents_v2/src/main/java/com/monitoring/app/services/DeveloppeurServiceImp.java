package com.monitoring.app.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Timer;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.monitoring.app.entities.Developpeur;
import com.monitoring.app.entities.Ticket;
import com.monitoring.app.entities.Ticket.Status;
import com.monitoring.app.entities.TicketRequest;
import com.monitoring.app.entities.TicketTimerTask;
import com.monitoring.app.repositories.DeveloppeurRepo;
import com.monitoring.app.repositories.TicketRepo;

@Service
public class DeveloppeurServiceImp implements DeveloppeurService{

	private DeveloppeurRepo developpeurRepo;
	private TicketRepo ticketRepo;
	private TicketService ticketService;


	public DeveloppeurServiceImp(DeveloppeurRepo developpeurRepo, TicketRepo ticketRepo,
			TicketService ticketService) {
		super();
		this.developpeurRepo = developpeurRepo;
		this.ticketRepo=ticketRepo;
		this.ticketService=ticketService;
	}
	
	@Override
	public ResponseEntity<String> updateTicket(Status status, String comment, long id_tick) {
		// TODO Auto-generated method stub
		Optional<Ticket> optionalTicket = ticketRepo.findById(id_tick);
        if (optionalTicket.isPresent()) {
            Ticket ticket = optionalTicket.get();
            Status oldStatus = ticket.getStatus();
            
            if (status.equals(Status.RÉSOLU)) {
                ticket.setDate_resolution(new Date()); // Set the date_fin attribute to the current date
            }
            else if(status.equals(Status.ANNULÉ)) {
            	ticket.setDate_fin(new Date());
            }
            ticket.setStatus(status);
            if(status.equals(Status.EN_COURS) && oldStatus.equals(Status.EN_COURS) || oldStatus.equals(Status.ANNULÉ) && status.equals(Status.EN_COURS) || oldStatus.equals(Status.RÉSOLU) && status.equals(Status.EN_COURS)) {
            	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Status can be updated to EN_COURS only one time.");
            }else if(status.equals(Status.OUVERT) && oldStatus.equals(Status.EN_COURS) || status.equals(Status.OUVERT) && oldStatus.equals(Status.ANNULÉ) || status.equals(Status.OUVERT) && oldStatus.equals(Status.RÉSOLU) || status.equals(Status.RÉSOLU) && oldStatus.equals(Status.RÉSOLU) || status.equals(Status.ANNULÉ) && oldStatus.equals(Status.ANNULÉ) ) {
            	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You can't update status");
            }
            if (status.equals(Status.EN_COURS) && ticket.getTimerTask() == null && !oldStatus.equals(Status.EN_COURS)) {
                ticketService.startTimer(ticket);
            }else if ((status.equals(Status.RÉSOLU) || status.equals(Status.ANNULÉ)) && ticket.getTimerTask() == null) {
                ticketService.stopTimer(ticket);
            }
            ticket.setCommentaire("");
            ticket.addComment(comment);
            ticketRepo.save(ticket);
            return ResponseEntity.ok("Ticket status and comment updated successfully.");
        } else {
        	return ResponseEntity.notFound().build();
        }
	}

	/*@Override
	public ResponseEntity<String> updateStatus(Status status, long id_tick) {
		// TODO Auto-generated method stub
		Optional<Ticket> optionalTicket = ticketRepo.findById(id_tick);
        if (optionalTicket.isPresent()) {
            Ticket ticket = optionalTicket.get();
            Status oldStatus = ticket.getStatus();
            ticket.setStatus(status);
            if (status.equals(Status.OUVERT) && ticket.getTimerTask() == null && !oldStatus.equals(Status.OUVERT)) {
                ticketService.startTimer(ticket);
            }else if ((status.equals(Status.RÉSOLU) || status.equals(Status.ANNULÉ)) && ticket.getTimerTask() == null) {
                ticketService.stopTimer(ticket);
            }
            ticketRepo.save(ticket);
            return ResponseEntity.ok("Ticket status updated successfully.");
        } else {
        	return ResponseEntity.notFound().build();
        }
	}*/

	@Override
	public List<Ticket> findAll_byIdDev(Long id) {
		// TODO Auto-generated method stub
		return ticketRepo.findAllByDeveloppeurId(id);
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

	/*@Override
	public String ajouterCommentaire(String comment, long id_tick) {
		// TODO: save comment to database or other data source
		Optional<Ticket> optionalTicket = ticketRepo.findById(id_tick);
	    if (optionalTicket.isPresent()) {
	        Ticket ticket = optionalTicket.get();
	        ticket.addComment(comment);
	        ticketRepo.save(ticket);
	        return "Comment added successfully for ticket " + id_tick;
	    } else {
	        return "Ticket with ID " + id_tick + " not found";
	    }
	}*/


}
