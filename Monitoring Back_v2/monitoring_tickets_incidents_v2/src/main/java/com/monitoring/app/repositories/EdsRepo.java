package com.monitoring.app.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.monitoring.app.entities.Eds;

public interface EdsRepo extends JpaRepository<Eds, Long>{
	@Query("select distinct e.description from Eds e")
	Collection<String> findEds();

}
