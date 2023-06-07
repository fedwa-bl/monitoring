package com.monitoring.app.entities;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor
public class Personne {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nom;
	private String prenom;
	private String tele;
	private String username;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	private String email;

	private boolean active=false;
	
	@ManyToMany(fetch = FetchType.EAGER)
	private Collection<AppRole> appRoles=new ArrayList<>();
	
	public Personne(String nom, String prenom, String tele, String username, String password, String email, boolean active, Collection<AppRole> appRoles) {
		this.nom = nom;
		this.prenom = prenom;
		this.tele = tele;
		this.username = username;
		this.password = password;
		this.email = email;
		this.active=active;
		this.appRoles = appRoles;
	}
	
	@Override
	public String toString() {
		return "Personne [id=" + id + ", nom=" + nom + ", prenom=" + prenom + ", tele=" + tele + ", username="
				+ username + ", password=" + password + ", email=" + email + ", active=" + active + ", appRoles="
				+ appRoles + "]";
	}
	
	

}
