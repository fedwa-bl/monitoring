package com.monitoring.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monitoring.app.entities.Application;

public interface ApplicationRepo extends JpaRepository<Application, Long> {

}
