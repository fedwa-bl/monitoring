package com.monitoring.app.services;

import com.monitoring.app.entities.Ticket;

public interface TicketService {

	void updateTimeSpent(Ticket ticket);
	void startTimer(Ticket ticket);
	void stopTimer(Ticket ticket);
}
