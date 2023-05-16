package com.monitoring.app.services;

import java.util.List;
import java.util.Optional;

import com.monitoring.app.entities.Admin;
import com.monitoring.app.entities.Developpeur;
import com.monitoring.app.entities.Eds;
import com.monitoring.app.entities.Ticket;
import com.monitoring.app.entities.Ticket.Status;

public interface AdminService {
	Developpeur ajouterDev(Developpeur dev);
	Admin ajouterAdmin(Admin admin);
	Developpeur updateDev(Developpeur dev);
	void deleteDev(Long id);
	List<Developpeur> allDevs();
	Optional<Developpeur> findDevById(Long id);
	Optional<Developpeur> findDevByCuid(String cuid);
	List<Ticket>findTicketsNonAttr();
	List<Ticket>findTicketsAttr();
	//test
	Ticket ajouterTicket(Ticket ticket);
	Optional<Ticket> findTicketById(Long id);
	Ticket updateStatus(Status s,Long id);
	Ticket assignDev(Developpeur dev,Long id);
	List<String> getEds();
}
