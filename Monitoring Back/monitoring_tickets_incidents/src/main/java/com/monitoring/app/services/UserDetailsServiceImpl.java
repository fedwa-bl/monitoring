package com.monitoring.app.services;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.monitoring.app.entities.Personne;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	private AccountService accountService;	
	
	public UserDetailsServiceImpl(AccountService accountService) {
		this.accountService = accountService;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Personne personne = accountService.loadUserByUsername(username);
		 Collection<GrantedAuthority> authorities = new ArrayList<>();
		 personne.getAppRoles().forEach(r->{
			 authorities.add(new SimpleGrantedAuthority(r.getRolename()));
		 });
		 return new CustomUser(personne.getUsername(), personne.getPassword(),authorities, personne.getId());
	}

}
