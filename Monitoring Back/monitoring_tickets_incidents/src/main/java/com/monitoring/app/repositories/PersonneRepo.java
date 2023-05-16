package com.monitoring.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monitoring.app.entities.Personne;

public interface PersonneRepo extends JpaRepository<Personne, Long>{

	Optional<Personne> findById(Long id);
	Personne findByUsername(String username);
}
