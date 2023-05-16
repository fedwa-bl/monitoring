package com.monitoring.app.entities;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lombok.Data;

@Entity
@Data
@DiscriminatorValue("A")
public class Admin extends Personne {
	@Column(unique = true)
	private String matrAdmin;

	public String getMatrAdmin() {
		return matrAdmin;
	}

	public void setMatrAdmin(String matrAdmin) {
		this.matrAdmin = matrAdmin;
	}

	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Admin(String nom, String prenom,String matrAdmin, String tele, String username, String password, String email, boolean active, Collection<AppRole> appRoles) {
		super( nom, prenom, tele, username, password, email, active, appRoles);
		this.matrAdmin=matrAdmin;
	}
	

}