package com.monitoring.app.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor
public class Client {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nom;
	private String prenom;
	private String tele;	
	private String email;
	
	public Client(String nom, String prenom, String tele, String email) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.tele = tele;
		this.email = email;
	}

}
