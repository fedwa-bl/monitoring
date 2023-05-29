package com.monitoring.app.services;

import java.util.List;
import java.util.Optional;

import com.monitoring.app.entities.AppRole;
import com.monitoring.app.entities.Personne;

public interface AccountService {

	Personne saveUser(Personne personne);
	Personne addNewUser(Personne personne);
	AppRole addNewRole(AppRole appRole);
	void addRoleToUser(String username, String rolename);
	Optional<Personne> loadUserByUserId(Long id);
	Personne loadUserByUsername(String username);
	List<Personne> listUsers();
	List<AppRole> listRoles();
	boolean needsPasswordChange(String username);
}
