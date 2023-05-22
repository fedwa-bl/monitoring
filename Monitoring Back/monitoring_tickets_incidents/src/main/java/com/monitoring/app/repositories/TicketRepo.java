package com.monitoring.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.monitoring.app.entities.Ticket;
import com.monitoring.app.entities.Ticket.Status;

public interface TicketRepo extends JpaRepository<Ticket, Long>{
	Optional<Ticket> findById(Long id);
	
	@Query("SELECT COUNT(*) FROM Ticket t WHERE t.application.eds.description = :eds AND MONTH(t.date_creation) = MONTH(NOW())")
	int countByEdsAndCurrentMonth(@Param("eds") String eds);
	@Query("SELECT COUNT(*) FROM Ticket t WHERE t.developpeur.username = :username AND t.status = :status AND MONTH(t.date_creation) = MONTH(NOW())")
	int countByDev(@Param("username") String username,@Param("status") Status status);
	@Query("select count(*) from Ticket t where MONTH(t.date_creation) = :mois")
	int countBySemester(@Param("mois") int mois);


	}
