package com.monitoring.app.entities;

import java.sql.Date;
import java.util.TimerTask;

import javax.persistence.Entity;

import com.monitoring.app.entities.Ticket.Criticite;
import com.monitoring.app.entities.Ticket.Status;
import com.monitoring.app.services.TicketService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class TicketTimerTask extends TimerTask {
    private Ticket ticket;
    private TicketService ticketService;
    private boolean isRunning = false;

    public TicketTimerTask(Ticket ticket, TicketService ticketService) {
        this.ticket = ticket;
        this.ticketService = ticketService;
    }
    
    public TicketTimerTask() {}

    public boolean isRunning() {
        return isRunning;
    }

    @Override
    public void run() {
        isRunning = true;
        ticketService.updateTimeSpent(ticket);
        isRunning = false;
    }
}


