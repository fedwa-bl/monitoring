package com.monitoring.app.security;
public class JWTUtil {

	public static final String SECRET="MySecret1234";
	public static final String AUTH_HEADER="Authorization";
	public static final String PREFIX="Bearer ";
	public static final long EXPIRE_ACCESS_TOKEN=60*60*1000;
	public static final long EXPIRE_REFRESH_TOKEN=60*60*60*1000;
}
