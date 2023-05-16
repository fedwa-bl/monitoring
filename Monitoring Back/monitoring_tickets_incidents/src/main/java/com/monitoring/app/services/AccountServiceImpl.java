package com.monitoring.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.monitoring.app.entities.AppRole;
import com.monitoring.app.entities.Developpeur;
import com.monitoring.app.entities.Admin;
import com.monitoring.app.entities.Personne;
import com.monitoring.app.repositories.AppRoleRepository;
import com.monitoring.app.repositories.DeveloppeurRepo;
import com.monitoring.app.repositories.PersonneRepo;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {

	private PersonneRepo personneRepository;
	private AppRoleRepository appRoleRepository;
	private PasswordEncoder passwordEncoder;
	
	public AccountServiceImpl(PersonneRepo personneRepository,
			AppRoleRepository appRoleRepository,
			PasswordEncoder passwordEncoder) {
		this.personneRepository = personneRepository;
		this.appRoleRepository = appRoleRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	public Personne saveUser(Personne personne) {
		return personneRepository.save(personne);
	}
	

	@Override
	public Personne addNewUser(Personne personne) {
		String pw = personne.getPassword();
		personne.setPassword(passwordEncoder.encode(pw));
		return personneRepository.save(personne);
	}

	@Override
	public AppRole addNewRole(AppRole appRole) {
		return appRoleRepository.save(appRole);
	}

	@Override
	public void addRoleToUser(String username, String roleName) {
		Personne personne=personneRepository.findByUsername(username);
		System.out.println(">>> personne "+personne);
		AppRole appRole=appRoleRepository.findByRolename(roleName);
		System.out.println(">>> app role  "+appRole);
		personne.getAppRoles().add(appRole);
	}

	@Override
	public Optional<Personne> loadUserByUserId(Long id) {
		return personneRepository.findById(id);
	}
	
	@Override
	public Personne loadUserByUsername(String username) {
		return personneRepository.findByUsername(username);
	}

	@Override
	public List<Personne> listUsers() {
		return personneRepository.findAll();
	}
	
	@Override
	public List<AppRole> listRoles() {
		return appRoleRepository.findAll();
	}

	@Override
	public boolean needsPasswordChange(String username) {
		Personne user = personneRepository.findByUsername(username);
		if(user == null) {
			throw new UsernameNotFoundException("User not found");
		}
		return user.isActive();
	}
	

}
