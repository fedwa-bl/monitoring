package com.monitoring.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monitoring.app.entities.AppRole;

public interface AppRoleRepository extends JpaRepository<AppRole, Long>{
	
	AppRole findByRolename(String rolename);
}
