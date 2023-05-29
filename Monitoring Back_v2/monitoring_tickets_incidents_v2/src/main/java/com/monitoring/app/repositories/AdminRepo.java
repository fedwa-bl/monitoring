package com.monitoring.app.repositories;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.monitoring.app.entities.Admin;
import com.monitoring.app.entities.Ticket;

public interface AdminRepo extends JpaRepository<Admin, Long> {
	@Query("select t from Ticket t where t.developpeur.id=null ORDER BY CASE t.criticite WHEN 'URGENT' THEN 1 WHEN 'CRITIQUE' THEN 2 WHEN 'NORMAL' THEN 3 WHEN 'NON_URGENT' THEN 4 END")
	Collection<Ticket> findTicketsNonAttr();
	@Query("select t from Ticket t where t.developpeur.id is not null")
	Collection<Ticket> findTicketsAttr();
	
	@Modifying
	@Query("UPDATE Ticket t SET t.developpeur.id = :id_dev WHERE t.id_ticket = :id_tic")
	@Transactional
	Integer attrTicket(long id_dev, long id_tic);

}
