package com.monitoring.app;

import java.sql.Date;
import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.monitoring.app.entities.Developpeur;
import com.monitoring.app.entities.Eds;
import com.monitoring.app.entities.Ticket;
import com.monitoring.app.entities.Ticket.Criticite;
import com.monitoring.app.entities.Ticket.Status;
import com.monitoring.app.repositories.ApplicationRepo;
import com.monitoring.app.repositories.ClientRepo;
import com.monitoring.app.repositories.EdsRepo;
import com.monitoring.app.services.AccountService;
import com.monitoring.app.services.AdminService;
import com.monitoring.app.entities.Admin;
import com.monitoring.app.entities.AppRole;
import com.monitoring.app.entities.Application;
import com.monitoring.app.entities.Client;

@SpringBootApplication
public class MonitoringTicketsIncidentsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MonitoringTicketsIncidentsApplication.class, args);
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
    CommandLineRunner saveUsers(AdminService adminService,AccountService accountService,EdsRepo edsRepo, ApplicationRepo applicationRepo,ClientRepo cr){
        return args -> {
        	
        	//add roles
        	accountService.addNewRole(new AppRole(null,"ADMIN"));
			accountService.addNewRole(new AppRole(null,"DEVELOPER"));
        	 
        	accountService.addNewUser(new Developpeur("ALAOUI","Mohamed","0654783743","MedAlaoui","TEMP_Pwd02"
        			,"ALAOUI.Mohamed@sofrecom.com",	"MATDEV02",false, new ArrayList<>()));
        	accountService.addNewUser(new Developpeur("HADI","Fadi","0639375740","fhadi","TEMP_Pwd04"
					,"HADI.Fadi@sofrecom.com",	"MATDEV04",false,new ArrayList<>()));     
        	accountService.addNewUser(new Developpeur("dev1","dev1","0639375740","dev1","TEMP_dev1"
					,"dev1.dev1@sofrecom.com",	"MATDEV05",false,new ArrayList<>())); 
			
			//ajouter les roles au utilisateurs
			accountService.addRoleToUser("dev1","DEVELOPER");
			accountService.addRoleToUser("MedAlaoui","DEVELOPER");
			
        	Admin admin=new Admin("super","admin", "Matr_Admin", "064989054", "superUser","root", "admin@sofrecom.com", true, new ArrayList<>());
        	accountService.addNewUser(admin);
        	accountService.addRoleToUser("superUser","ADMIN");
			//ajouter des applications
        	Eds eds1=new Eds("EDS1");
        	Eds eds2=new Eds("EDS2");
        	edsRepo.save(eds1);
        	edsRepo.save(eds2);

			Application application1= new Application("confluence", "this is a test");
        	Application application2= new Application("liveDoc", "this is a test");
        	application1.setEds(eds1);
        	application2.setEds(eds2);
        	applicationRepo.save(application1);
        	applicationRepo.save(application2);
        	//ajouter un client
        	Client c1=new Client("HAMID","Ahmed","064989054","Hamid@gmail.com");
        	cr.save(c1);
        	Client c2=new Client("LARABI","Asmaa ","064989054","LARABI@gmail.com");
        	cr.save(c2);
        	//ajouter des tickets
        
        	Ticket ticket1=new Ticket(Criticite.URGENT, "this is a test", Status.EN_ATTENTE,new Date(System.currentTimeMillis()) ,new Date(System.currentTimeMillis() + 15 * 24 * 60 * 60 * 1000) );
        	ticket1.setApplication(application1);
        	ticket1.setAdmin(admin);
        	ticket1.setClient(c1);
        	adminService.ajouterTicket(ticket1);
        	Ticket ticket2=new Ticket(Criticite.CRITIQUE, "this is a test", Status.EN_ATTENTE,new Date(System.currentTimeMillis()) ,new Date(System.currentTimeMillis() + 15 * 24 * 60 * 60 * 1000) );
        	ticket2.setApplication(application1);
        	ticket2.setAdmin(admin);
        	ticket2.setClient(c2);
        	adminService.ajouterTicket(ticket2);
        	Ticket ticket3=new Ticket(Criticite.NORMAL, "this is a test", Status.EN_ATTENTE,new Date(System.currentTimeMillis()) ,new Date(System.currentTimeMillis() + 15 * 24 * 60 * 60 * 1000) );
        	ticket3.setApplication(application1);
        	ticket3.setAdmin(admin);
        	ticket3.setClient(c1);
        	adminService.ajouterTicket(ticket3);
        	Ticket ticket4=new Ticket(Criticite.NON_URGENT, "this is a test", Status.EN_ATTENTE,new Date(System.currentTimeMillis()) ,new Date(System.currentTimeMillis() + 15 * 24 * 60 * 60 * 1000) );
        	ticket4.setApplication(application2);
        	ticket4.setAdmin(admin);
        	ticket4.setClient(c2);
        	adminService.ajouterTicket(ticket4);
        	
        };
        }

}
