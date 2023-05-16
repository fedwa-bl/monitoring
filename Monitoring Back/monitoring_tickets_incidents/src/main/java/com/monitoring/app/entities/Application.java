package com.monitoring.app.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor
public class Application {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nom;
	private String description;
	@ManyToOne
    @JoinColumn(name = "eds_id")
    private Eds eds;
	public Application() {
	}

	public Application(String nom, String description) {
		this.nom = nom;
		this.description = description;
	}
	
	public Application(Long id, String nom, String description, Eds eds) {
		super();
		this.id = id;
		this.nom = nom;
		this.description = description;
		this.eds = eds;
	}
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Eds getEds() {
		return eds;
	}
	public void setEds(Eds eds) {
		this.eds = eds;
	}
	

}
