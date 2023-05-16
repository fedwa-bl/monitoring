package com.monitoring.app.repositories;
import java.util.Collection;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.monitoring.app.entities.Developpeur;

public interface DeveloppeurRepo extends JpaRepository<Developpeur, Long>{
	Optional<Developpeur> findByMatrDev(String matr);
	@Query("SELECT p FROM Personne p  WHERE p.matrAdmin IS NULL and p.active = true and p.nb_tickets_assignes<3" )
	Collection<Developpeur>getActiveDevs();
	@Query("select p from Personne p where p.username =?1")
	Developpeur findMatrByNom(String nom);
	Developpeur findByUsername(String username);
	@Query("select p.username from Personne p  WHERE p.matrAdmin IS NULL and p.active = true and p.nb_tickets_assignes !=0")
	Collection<String> getDevs();
}
