package com.monitoring.app.entities;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
@DiscriminatorValue("D")
public class Developpeur extends Personne{
	private int nb_tickets_assignes;
	@Column(unique = true)
	private String matrDev;
	public String getMatrDev() {
		return matrDev;
	}

	public void setMatrDev(String matrDev) {
		this.matrDev = matrDev;
	}

	public Developpeur() {
		  super();
	}

	public Developpeur( String nom, String prenom, String tele, String username, String password, String email,
			String matrDev, boolean active, Collection<AppRole> appRoles) {
		super(nom, prenom, tele, username, password, email, active, appRoles);
		this.nb_tickets_assignes=0;
		this.matrDev=matrDev;
	}

	public Developpeur(String nom, String prenom, String tele, String username, String password, String email,
			String matrDev, boolean active,Collection<AppRole> appRoles, int nb_tickets_assignes) {
		super(nom, prenom, tele, username, password, email, active, appRoles);
		this.nb_tickets_assignes = nb_tickets_assignes;
		this.matrDev=matrDev;
	}

	public int getNb_tickets_assignes() {
		return nb_tickets_assignes;
	}

	public void setNb_tickets_assignes(int nb_tickets_assignes) {
		this.nb_tickets_assignes = nb_tickets_assignes;
	}


	

}