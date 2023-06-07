package com.monitoring.app.repositories;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.monitoring.app.entities.Ticket;
import com.monitoring.app.entities.Ticket.Status;

public interface TicketRepo extends JpaRepository<Ticket, Long>{
	Optional<Ticket> findById(Long id);
	List<Ticket> findAllByDeveloppeurId(Long id);

	//nombre de status (résolu, annulé, ouvert, en_attente)
	@Query("SELECT t.status, COUNT(t) FROM Ticket t WHERE t.developpeur.id = :developerId AND t.status IS NOT NULL GROUP BY t.status")
	List<Object[]> countTicketsByStatusForDeveloper(@Param("developerId") Long developerId);
	
	//nombre de status (résolu, annulé, ouvert, en_attente) par application
	@Query("SELECT T.status, COUNT(T.status) FROM Ticket T WHERE T.developpeur.id = :developerId AND T.application.nom = :appName GROUP BY T.status")
	List<Object[]> countTicketsByStatusForDeveloperAndAppName(@Param("developerId") Long developerId, @Param("appName") String appName);
	
	//nombre de criticite (URGENT, CRITIQUE, NORMAL, NON_URGENT)
	@Query("SELECT t.criticite, COUNT(t) FROM Ticket t WHERE t.developpeur.id = :developerId AND t.criticite IS NOT NULL GROUP BY t.criticite")
	List<Object[]> countTicketsByCriticiteForDeveloper(@Param("developerId") Long developerId);
	
	//nombre de status (URGENT, CRITIQUE, NORMAL, NON_URGENT) par application
	@Query("SELECT T.criticite, COUNT(T.criticite) FROM Ticket T WHERE T.developpeur.id = :developerId AND T.application.nom = :appName GROUP BY T.criticite")
	List<Object[]> countTicketsByCriticiteForDeveloperAndAppName(@Param("developerId") Long developerId, @Param("appName") String appName);
	@Query("SELECT COUNT(*) FROM Ticket t WHERE t.application.eds.description = :eds AND MONTH(t.date_creation) = MONTH(NOW())")
	int countByEdsAndCurrentMonth(@Param("eds") String eds);
	@Query("SELECT COUNT(*) FROM Ticket t WHERE t.developpeur.username = :username AND t.status = :status AND MONTH(t.date_creation) = MONTH(NOW())")
	int countByDev(@Param("username") String username,@Param("status") Status status);
	@Query("SELECT COUNT(*) FROM Ticket t WHERE t.status = :status AND MONTH(t.date_creation) = MONTH(NOW())")
	int countByStatus(@Param("status") Status status);
	@Query("select count(*) from Ticket t where MONTH(t.date_creation) = :mois")
	int countBySemester(@Param("mois") int mois);
	@Query("SELECT FUNCTION('MONTH', t.date_creation), t.status, COUNT(t) FROM Ticket t WHERE t.developpeur.id = :developerId AND t.status IN ('RESOLU', 'ANNULE', 'EN_COURS', 'OUVERT') GROUP BY FUNCTION('MONTH', t.date_creation), t.status")
	List<Object[]> countTicketsByStatusAndMonthForDeveloper(@Param("developerId") Long developerId);
	@Query("SELECT COUNT(*) FROM Ticket t WHERE t.status='EN_ATTENTE' and DATE(t.date_creation) = CURDATE()")
	int countByDay();
	@Query("SELECT COUNT(*) FROM Ticket t WHERE t.status='EN_COURS' and DATE(t.date_creation) = CURDATE()")
	int countByDayInProgress();
	@Query("SELECT COUNT(*) FROM Ticket t WHERE t.status='OUVERT' AND t.developpeur.id = :developerId AND DATE(t.date_creation) = CURDATE()")
	int countByDayDev(@Param("developerId") Long developerId);

}
