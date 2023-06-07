package com.monitoring.app.entities;

import java.util.Date;

import javax.annotation.Priority;

import com.monitoring.app.entities.Ticket.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class TicketRequest {
	
    private String status;
    private String comment;
    private Date date_fin;
    
}
