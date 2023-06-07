package com.monitoring.app.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monitoring.app.entities.Developpeur;
import com.monitoring.app.entities.Ticket;
import com.monitoring.app.entities.Ticket.Status;
import com.monitoring.app.entities.TicketRequest;
import com.monitoring.app.repositories.TicketRepo;
import com.monitoring.app.services.DeveloppeurService;

@RestController
@RequestMapping("/dev")
@CrossOrigin(origins = "http://localhost:4200")
public class DevController {
	private DeveloppeurService developpeurService ;
	private TicketRepo ticketRepo;

	public DevController(DeveloppeurService developpeurService,
			TicketRepo ticketRepo) {
		this.developpeurService = developpeurService;
		this.ticketRepo=ticketRepo;
	}
	
	@GetMapping("/all")
	public List<Developpeur> getAllDevs(){
		return developpeurService.findAll();
	}
	
	//get all tickets assigned to a developer
	@GetMapping("/allTickets/{id_div}")
	public List<Ticket> getAllTickets(@PathVariable("id_div") Long id){
		return developpeurService.findAll_byIdDev(id);
	} 
	
	//get tickets with status 'EN_COURS'
	@GetMapping("/EN_COURSTickets/{id_div}")
	public List<Ticket> getEN_COURSTickets(@PathVariable("id_div") Long id, @RequestParam("status") String status) {
	    return developpeurService.findAll_byIdDev(id).stream()
            .filter(ticket -> ticket.getStatus().equals(Ticket.Status.EN_COURS))
            .collect(Collectors.toList());
	}
	
	//get tickets with status 'EN_ATTENTE'
	@GetMapping("/EN_ATTENTETickets/{id_div}")
	public List<Ticket> getEN_ATTENTETickets(@PathVariable("id_div") Long id, @RequestParam("status") String status) {
	    return developpeurService.findAll_byIdDev(id).stream()
            .filter(ticket -> ticket.getStatus().equals(Ticket.Status.EN_ATTENTE))
            .collect(Collectors.toList());
	}
	
	//get tickets with status 'OUVERT'
	@GetMapping("/OUVERTTickets/{id_div}")
	public List<Ticket> getOUVERTickets(@PathVariable("id_div") Long id, @RequestParam("status") String status) {
	    return developpeurService.findAll_byIdDev(id).stream()
            .filter(ticket -> ticket.getStatus().equals(Ticket.Status.OUVERT))
            .collect(Collectors.toList());
	}
	//get tickets with status 'RÉSOLU'
	@GetMapping("/RESOLUTickets/{id_div}")
	public List<Ticket> getRESOLUTickets(@PathVariable("id_div") Long id, @RequestParam("status") String status) {
	    return developpeurService.findAll_byIdDev(id).stream()
            .filter(ticket -> ticket.getStatus().equals(Ticket.Status.RÉSOLU))
            .collect(Collectors.toList());
	}
		
	//get tickets with status 'ANNULÉ'
	@GetMapping("/ANNULETickets/{id_div}")
	public List<Ticket> getANNULETickets(@PathVariable("id_div") Long id, @RequestParam("status") String status) {
	    return developpeurService.findAll_byIdDev(id).stream()
            .filter(ticket -> ticket.getStatus().equals(Ticket.Status.ANNULÉ))
            .collect(Collectors.toList());
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
	
	@PutMapping("/updateTicket/{id_tick}")
	public ResponseEntity<String> updateDev(@RequestBody TicketRequest request, @PathVariable("id_tick") long idTick) {
		Status newStatus = Status.valueOf(request.getStatus());
	    String comment = request.getComment();
	    return developpeurService.updateTicket(newStatus, comment, idTick);
	}
	@GetMapping("/tickets/count/curDayDev/{id}")
	public int countTotalTicketsCurDay(@PathVariable("id") Long id) {
	   return ticketRepo.countByDayDev(id);
	}
	
	/*@PutMapping("/updateStatus/{id_tick}")
	public ResponseEntity<String> updateDev(@RequestBody Map<String, String> payload, @PathVariable("id_tick") long idTick) {
		String status = payload.get("status");
	    Status newStatus = Status.valueOf(status);
	    return developpeurService.updateStatus(newStatus, idTick);
	}
	
	@PostMapping("/commentaire/{id_tick}")
	public ResponseEntity<String> ajouterCommentaire(@PathVariable("id_tick") long idTick, @RequestBody String comment) {
	    Optional<Ticket> optionalTicket = ticketRepo.findById(idTick);
	    if (optionalTicket.isPresent()) {
	        Ticket ticket = optionalTicket.get();
	        ticket.setCommentaire("");
	        ticket.addComment(comment);
	        ticketRepo.save(ticket);
	        return ResponseEntity.ok("Comment added successfully for ticket " + idTick);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}*/
	
	


}

