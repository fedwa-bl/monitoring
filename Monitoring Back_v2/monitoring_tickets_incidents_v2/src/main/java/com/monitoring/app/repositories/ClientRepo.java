package com.monitoring.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monitoring.app.entities.Client;


public interface ClientRepo extends JpaRepository<Client, Long>{

}
