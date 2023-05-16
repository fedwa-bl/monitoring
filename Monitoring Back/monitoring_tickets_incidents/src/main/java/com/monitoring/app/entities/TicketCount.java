package com.monitoring.app.entities;

public class TicketCount {
	private int month;
    private int numTickets;

    public TicketCount(int month, int numTickets) {
        this.month = month;
        this.numTickets = numTickets;
    }

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getNumTickets() {
		return numTickets;
	}

	public void setNumTickets(int numTickets) {
		this.numTickets = numTickets;
	}
    
}
