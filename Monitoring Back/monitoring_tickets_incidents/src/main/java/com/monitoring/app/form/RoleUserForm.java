package com.monitoring.app.form;

import lombok.Data;

@Data
public class RoleUserForm {

	private String username;
	private String rolename;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	
}
