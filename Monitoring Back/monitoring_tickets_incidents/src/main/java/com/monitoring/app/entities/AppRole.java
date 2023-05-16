package com.monitoring.app.entities;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class AppRole {
	
	@Override
	public String toString() {
		return "AppRole [id=" + id + ", rolename=" + rolename + "]";
	}
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String rolename;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	public AppRole(Long id, String rolename) {
		super();
		this.id = id;
		this.rolename = rolename;
	}
	public AppRole() {
		super();
	}
	
}
