package com.monitoring.app.entities;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Timer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.monitoring.app.entities.Ticket.Criticite;
import com.monitoring.app.entities.Ticket.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Ticket {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id_ticket;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Criticite criticite;
	@Transient
	private long temps_passe;
	private String duration; // new attribute // to store the time spent in seconds
	@Transient // to indicate that this attribute is not to be persisted in the database
    private TicketTimerTask timerTask;
	@Transient
    private Timer timer;
	private String description;
	private String commentaire;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status;
	private Date date_creation=new Date(System.currentTimeMillis());
	private Date date_fin=new Date(System.currentTimeMillis() + 15 * 24 * 60 * 60 * 1000);
	private Date date_resolution;
	@ManyToOne
	private Developpeur developpeur;
	@ManyToOne Admin admin;
	@ManyToOne
	private Application application;
	@ManyToOne 
	private Client client;
	private int durée=15;

	
	public int getDurée() {
		return durée;
	}

	public void setDurée(int durée) {
		this.durée = durée;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Ticket(Criticite criticite, String description,String commentaire, Status status, Date date_creation,
			Date date_fin, Developpeur developpeur, Application application, Duration duration) {
		this.criticite = criticite;
		this.description = description;
		this.commentaire = commentaire;
		this.status = status;
		this.date_creation = date_creation;
		this.date_fin = date_fin;
		this.developpeur = developpeur;
		this.application = application;
		this.temps_passe = 0;
        this.timerTask = null;
        this.duration = "0:00:00:00";
	}
	
	public void addComment(String comment) {
        if (commentaire == null) {
        	commentaire = comment;
        } else {
        	commentaire += "\n" + comment;
        }
    }
	
	public Ticket(Criticite criticite, String description, Status status) {
		this.criticite = criticite;
		this.description = description;
		this.status = status;
	}
	
	
	//@JsonFormat(shape = JsonFormat.Shape.OBJECT)
	public enum Status{
		EN_ATTENTE,RÉSOLU, OUVERT, ANNULÉ, EN_COURS
	}
	/*public enum Status {
	    EN_ATTENTE("En Attente"),
	    RÉSOLU("Résolu"),
	    OUVERT("Ouvert"),
	    ANNULÉ("Annulé");
	    
	    private final String label;
	    
	    private Status(String label) {
	        this.label = label;
	    }
	    
	    public String toString() {
	        return label;
	    }
	}*/
	public enum Criticite{
		URGENT,CRITIQUE,NORMAL,NON_URGENT
	}
	

	
	
}