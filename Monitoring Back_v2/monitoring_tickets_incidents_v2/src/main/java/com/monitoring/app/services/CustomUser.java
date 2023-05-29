package com.monitoring.app.services;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUser extends User{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long cuid;

    public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities, Long cuid) {
        super(username, password, authorities);
        this.cuid = cuid;
    }

    public Long getCuid() {
        return cuid;
    }

    public void setId(Long cuid) {
        this.cuid = cuid;
    }
}
