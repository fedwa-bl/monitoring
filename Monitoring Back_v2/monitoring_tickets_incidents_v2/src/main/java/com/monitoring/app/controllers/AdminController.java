package com.monitoring.app.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monitoring.app.entities.Admin;
import com.monitoring.app.entities.Developpeur;
import com.monitoring.app.entities.Ticket;
import com.monitoring.app.entities.Ticket.Status;
import com.monitoring.app.repositories.DeveloppeurRepo;
import com.monitoring.app.repositories.TicketRepo;
import com.monitoring.app.services.AccountService;
import com.monitoring.app.services.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
	
	@Autowired
	private TicketRepo ts;
	@Autowired
	private DeveloppeurRepo dr;
	@Autowired
	private AccountService accountService;
	private AdminService adminService;

	public AdminController(AdminService adminService) {
		super();
		this.adminService = adminService;
	}
	
	@PostMapping("/dev")
	public Developpeur ajouterDeveloppeur(@RequestBody Developpeur dev) {
		
		Developpeur d = (Developpeur) accountService.addNewUser(dev);
		accountService.addRoleToUser(d.getUsername(), "DEVELOPER");
		return d;
	}
	
	@GetMapping("/devs")
	public List<Developpeur> listDevs(){
		return adminService.allDevs();
	}

	@GetMapping("/dev/{cuid}")
	public Optional<Developpeur> finDevByCuid(@PathVariable String cuid){
		return adminService.findDevByCuid(cuid);
	}
	@GetMapping("/ticket/{id}")
	public Optional<Ticket> findTicketById(@PathVariable Long id){
		return adminService.findTicketById(id);
	}
	
	@DeleteMapping("dev/{id}")
	public void supprimerDev (@PathVariable Long id) {
		adminService.deleteDev(id);
	}
	@PutMapping("dev")
	public Developpeur updateDev(@RequestBody Developpeur dev) {
		return adminService.updateDev(dev);
	}
	@GetMapping("bugs")
	public List<Ticket> getTicketNonAttr(){
		return adminService.findTicketsNonAttr();
	}
	@GetMapping("affectation")
	public List<Ticket> getTicketAttr(){
		return adminService.findTicketsAttr();
	}
	//test
	@PostMapping("ticket")
	public Ticket addTicket(Ticket ticket) {
		return adminService.ajouterTicket(ticket);
	}
	@PostMapping("admin")
	public Admin addAdmin(Admin admin) {
		return adminService.ajouterAdmin(admin);
	}
	@GetMapping("eds")
	public List<String> getEds(){
		return adminService.getEds();
	}
	@GetMapping("/tickets/count")
	public int countByEdsAndCurrentMonth(@RequestParam("eds") String eds) {
	    return ts.countByEdsAndCurrentMonth(eds);
	}
	@GetMapping("/tickets/count/curDay")
	public int countTotalTicketsCurDay() {
	   return ts.countByDay();
	}
	@GetMapping("/tickets/count/curDayInProgress")
	public int countTotalTicketsCurDayInProgress() {
	   return ts.countByDayInProgress();
	}
	
	@GetMapping("/username")
	public List<String> getUsername(){
		return (List<String>) dr.getDevs();
	}

	@GetMapping("/tickets/countDev")
	public int countByDev(@RequestParam("username") String dev,@RequestParam("status") Status status) {
	    return ts.countByDev(dev,status);
	}
	@GetMapping("/tickets/countStatus")
	public int countByStatus(@RequestParam("status") Status status) {
	    return ts.countByStatus(status);
	}
	@GetMapping("/ticketSemester")
    public int getTicketCounts(@RequestParam("mois") int mois) {
        return ts.countBySemester(mois);
    }
	@GetMapping("/usernames/{id}")
	public List<Developpeur> getUsernames(@PathVariable Long id){
		Ticket t =ts.findById(id).get();
		System.out.println(t.getId_ticket());
		Long oldDevId=t.getDeveloppeur().getId();
		return (List<Developpeur>) dr.getDevsUpdate(oldDevId);
	}
	@PostMapping("/assign")
	public AssignResponse assign(@RequestBody AssignInput input) {
		Optional<Ticket> ticketOp = ts.findById(input.id_ticket);
		Optional<Developpeur> devOp = adminService.findDevByCuid(input.matrDev );
		AssignResponse response = new AssignResponse();
		if (ticketOp.isPresent()&&devOp.isPresent()) {
	        Ticket ticket = ticketOp.get();
	        Developpeur dev=devOp.get();
		if(ticket == null) {
			response.error.field = "ticket";
			response.error.message = "ticket not found";
		}else if(dev == null){
			response.error.field = "dev";
			response.error.message = "dev not found";
		}else if(ticket.getStatus() != Status.EN_ATTENTE || ticket.getDeveloppeur() != null) {
			response.error.field = "ticket";
			response.error.message = "ticket Already assigned";
		}else {
			response.ticket =adminService.assignDev(dev, ticket.getId_ticket());
						
		}
		}
		return response;
	}
	@PostMapping("/reAssign")
	public AssignResponse reAssign(@RequestBody AssignInput input) {
		Optional<Ticket> ticketOp = ts.findById(input.id_ticket);
		Optional<Developpeur> devOp = adminService.findDevByCuid(input.matrDev );
		System.out.println(ticketOp);
		AssignResponse response = new AssignResponse();
		if (ticketOp.isPresent()&&devOp.isPresent()) {
	        Ticket ticket = ticketOp.get();
	        Developpeur dev=devOp.get();
		if(ticket == null) {
			response.error.field = "ticket";
			response.error.message = "ticket not found";
		}else if(dev == null){
			response.error.field = "dev";
			response.error.message = "dev not found";
		}else {
			response.ticket =adminService.reAssignDev(dev, ticket.getId_ticket());
						
		}
		}
		return response;
	}
	
}


class AssignInput {
	public Long id_ticket;
	public String matrDev ;
}

class Error {
    public String field;
    public String message;
}

class AssignResponse {
	AssignResponse() {
		this.error = new Error();
	}

	public Ticket ticket;
	public Error error;
}
