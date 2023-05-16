package com.monitoring.app.controllers;

import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.monitoring.app.security.JWTUtil;
import com.monitoring.app.entities.AppRole;
import com.monitoring.app.entities.Personne;
import com.monitoring.app.form.RoleUserForm;
import com.monitoring.app.services.AccountService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class AccountRestController {
	
	private AccountService accountService;
	private PasswordEncoder passwordEncoder;
	
	public AccountRestController(AccountService accountService, PasswordEncoder passwordEncoder) {
		this.accountService = accountService;
		this.passwordEncoder = passwordEncoder;
	}

	@GetMapping(path = "/users")
	@PostAuthorize("hasAuthority('DEVELOPER')")
	public List<Personne> appUsers(){
		 return accountService.listUsers();
	}
	
	@PostMapping(path = "/users")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Personne saveUser(@RequestBody Personne appUser) {
		
		return accountService.addNewUser(appUser);
	}
	
	@PostMapping(path = "/roles")
	@PreAuthorize("hasAuthority('ADMIN')")
	public AppRole saveRole(@RequestBody AppRole appRole) {
		return accountService.addNewRole(appRole);
	}
	
	@GetMapping(path = "/roles")
	@PreAuthorize("hasAuthority('ADMIN')")
	public List<AppRole> appRoles(){
		 return accountService.listRoles();
	}
	
	@PostMapping(path = "/addRoleToUser")
	@PreAuthorize("hasAuthority('ADMIN')")
	public void addRoleToUser(@RequestBody RoleUserForm roleUserForm) {
		accountService.addRoleToUser(roleUserForm.getUsername(), roleUserForm.getRolename());
	}
	
	//is active or not (is the user change his password or not)
	@GetMapping(path = "/users/{username}/forcePasswordChange")
	public ResponseEntity<Boolean> forcePasswordChange(@PathVariable String username) {
		boolean needsChange = accountService.needsPasswordChange(username);
		return ResponseEntity.ok(needsChange);
	}
	
	//chnager le mot de passe
	@PostMapping(path = "/users/{id}/changePassword")
	public void changePassword(@PathVariable Long id, @RequestBody Personne user) {
		// get the existing user from the data store
	    Personne existingUser = accountService.loadUserByUserId(id)
	        .orElseThrow(() -> new RuntimeException("User not found"));
	    

	    if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
	    	throw new IllegalArgumentException("New password cannot be the same as the old password");
	    }

	    // update the password field
	    existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
	    existingUser.setActive(true);
	    // save the updated user back to the data store
	    accountService.saveUser(existingUser);
	}
	
	
	@GetMapping(path = "/refreshToken")
	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String authToken = request.getHeader(JWTUtil.AUTH_HEADER);
		if(authToken!=null && authToken.startsWith(JWTUtil.PREFIX)) {
			try {
				String jwt = authToken.substring(JWTUtil.PREFIX.length());
				Algorithm algorithm = Algorithm.HMAC256(JWTUtil.SECRET);
				JWTVerifier jwtVerifier = JWT.require(algorithm).build();
				DecodedJWT decodedJWT = jwtVerifier.verify(jwt);
				String username = decodedJWT.getSubject();
				Personne appUser = accountService.loadUserByUsername(username);
				String jwtAccessToken = JWT.create()
						.withSubject(appUser.getUsername())
						.withExpiresAt(new Date(System.currentTimeMillis()+JWTUtil.EXPIRE_ACCESS_TOKEN))
						.withIssuer(request.getRequestURL().toString())
						.withClaim("roles",appUser.getAppRoles().stream().map(r->r.getRolename()).collect(Collectors.toList()))
						.sign(algorithm);
				Map<String, String> idToken = new HashMap<>();
				idToken.put("access-token",jwtAccessToken);
				idToken.put("refresh-token",jwt);
				response.setContentType("application/json");
				new ObjectMapper().writeValue(response.getOutputStream(),idToken);
			}catch(Exception e) {
				throw e;
			}
		}
		else {
			throw new RuntimeException("Refresh token required");
		}
	}
	
	@GetMapping(path="/profile")
	public Personne profile(Principal principal) {
		return accountService.loadUserByUsername(principal.getName());
	}
}
