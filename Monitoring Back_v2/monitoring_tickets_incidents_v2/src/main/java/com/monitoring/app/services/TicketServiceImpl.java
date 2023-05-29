package com.monitoring.app.services;

import java.sql.Time;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;

import org.springframework.stereotype.Service;

import com.monitoring.app.entities.Ticket;
import com.monitoring.app.repositories.TicketRepo;
import com.monitoring.app.entities.TicketTimerTask;

@Service
public class TicketServiceImpl implements TicketService{

	private TicketRepo ticketRepo;
	private Timer timer;
	private Map<Long, TicketTimerTask> timerTasks;
	
	public TicketServiceImpl(TicketRepo ticketRepo) {
		this.ticketRepo = ticketRepo;
		this.timer = new Timer();
		this.timerTasks = new HashMap<>();
	}

	/*@Override
	public void updateTimeSpent(Ticket ticket) {
		ticket.setTemps_passe(ticket.getTemps_passe() + 1);
		long seconds = ticket.getTemps_passe();
		long days = seconds / 86400;
	    long hours = (seconds % 86400) / 3600;
	    long minutes =(seconds % 3600) / 60;
	    long secs = seconds % 60;

	    long totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + secs;
	    Duration duration = Duration.ofSeconds(totalSeconds);
	    long millis = duration.toMillis();
	    Time time = new Time(millis);
	    ticket.setDuration(time);
	    ticketRepo.save(ticket);
	}*/
	
	@Override
	public void updateTimeSpent(Ticket ticket) {
	    ticket.setTemps_passe(ticket.getTemps_passe() + 1);
	    long seconds = ticket.getTemps_passe();
	    long days = seconds / 86400;
	    long hours = (seconds % 86400) / 3600;
	    long minutes =(seconds % 3600) / 60;
	    long secs = seconds % 60;

	    String duration = String.format("%d:%02d:%02d:%02d", days, hours, minutes, secs);
	    ticket.setDuration(duration);
	    ticketRepo.save(ticket);
	}

	@Override
    public void startTimer(Ticket ticket) {
        TicketTimerTask timerTask = new TicketTimerTask() {
            @Override
            public void run() {
                updateTimeSpent(ticket);
            }
        };
        ticket.setTimerTask(timerTask);
        timer.scheduleAtFixedRate(timerTask, 0, 1000);
        timerTasks.put(ticket.getId_ticket(), timerTask);
    }
	
	@Override
	public void stopTimer(Ticket ticket) {
	    TicketTimerTask timerTask = timerTasks.get(ticket.getId_ticket());
	    if (timerTask != null) {
	        timerTask.cancel();
	        timerTasks.remove(ticket.getId_ticket());
	        ticket.setTimerTask(null); // Clear the timerTask field of the Ticket object
	    }
	}
	
	
}
