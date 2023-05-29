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
	

	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	/*public long getId() {
        //System.out.println("getId() called, id is: " + id);
        if (id == null) {
            System.out.println("getId() called, id is null");
        } else {
            //System.out.println("getId() called, id is: " + id);
        }
        return id;
    }*/
	public void setId(Long id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getTele() {
		return tele;
	}
	public void setTele(String tele) {
		this.tele = tele;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public Collection<AppRole> getAppRoles() {
		return appRoles;
	}
	public void setAppRoles(Collection<AppRole> appRoles) {
		this.appRoles = appRoles;
	}

	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Personne [id=" + id + ", nom=" + nom + ", prenom=" + prenom + ", tele=" + tele + ", username="
				+ username + ", password=" + password + ", email=" + email + ", active=" + active + ", appRoles="
				+ appRoles + "]";
	}
	
	

}
