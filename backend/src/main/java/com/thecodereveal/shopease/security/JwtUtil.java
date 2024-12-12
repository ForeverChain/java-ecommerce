package com.thecodereveal.shopease.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component // Mark this class as a Spring-managed bean
public class JwtUtil {

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private static final long EXPIRATION_TIME = 86400000L; // 1 day in milliseconds

    /**
     * Generate a JWT token
     */
    public String generateToken(String userId, String email) {
        return Jwts.builder()
                .setSubject(userId) // Add user id to the subject
                .claim("email", email) // Add email as a custom claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)
                .compact();
    }
}
