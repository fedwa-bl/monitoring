package com.monitoring.app.entities;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

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
	private String description;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status;
	private Date date_creation;
	private Date date_fin;
	@ManyToOne
	private Developpeur developpeur;
	@ManyToOne Admin admin;
	@ManyToOne
	private Application application;
	@ManyToOne 
	private Client client;
	
	
	public Client getClient() {
		return client;
	}
	public void setClient(Client client) {
		this.client = client;
	}
	public Ticket() {
	}
	public Ticket(Criticite criticite, String description, Status status, Date date_creation,
			Date date_fin, Developpeur developpeur, Application application) {
		this.criticite = criticite;
		this.description = description;
		this.status = status;
		this.date_creation = date_creation;
		this.date_fin = date_fin;
		this.developpeur = developpeur;
		this.application = application;
	}
	
	
	public Ticket(Criticite criticite, String description, Status status, Date date_creation, Date date_fin,
			Application application) {
		super();
		this.criticite = criticite;
		this.description = description;
		this.status = status;
		this.date_creation = date_creation;
		this.date_fin = date_fin;
		this.application = application;
	}
	public Ticket(Criticite criticite, String description, Status status, Date date_creation, Date date_fin) {
		super();
		this.criticite = criticite;
		this.description = description;
		this.status = status;
		this.date_creation = date_creation;
		this.date_fin = date_fin;
	}
	public Criticite getCriticite() {
		return criticite;
	}
	public void setCriticite(Criticite criticite) {
		this.criticite = criticite;
	}
	public long getId_ticket() {
		return id_ticket;
	}
	public void setId_ticket(long id_ticket) {
		this.id_ticket = id_ticket;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Date getDate_creation() {
		return date_creation;
	}
	public void setDate_creation(Date date_creation) {
		this.date_creation = date_creation;
	}
	public Date getDate_fin() {
		return date_fin;
	}
	public void setDate_fin(Date date_fin) {
		this.date_fin = date_fin;
	}
	public Developpeur getDeveloppeur() {
		return developpeur;
	}
	public void setDeveloppeur(Developpeur developpeur) {
		this.developpeur = developpeur;
	}
	public Admin getAdmin() {
		return admin;
	}
	public void setAdmin(Admin admin) {
		this.admin = admin;
	}
	public Application getApplication() {
		return application;
	}
	public void setApplication(Application application) {
		this.application = application;
	}
	public enum Status{
		EN_ATTENTE,RÉSOLU, OUVERT, ANNULÉ
	}
	public enum Criticite{
		URGENT,CRITIQUE,NORMAL,NON_URGENT
	}
	
}