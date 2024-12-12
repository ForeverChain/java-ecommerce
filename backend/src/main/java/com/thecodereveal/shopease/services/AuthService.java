package com.thecodereveal.shopease.services;

import com.thecodereveal.shopease.dto.AuthRequest;
import com.thecodereveal.shopease.dto.AuthResponse;
import com.thecodereveal.shopease.dto.RegisterRequest;
import com.thecodereveal.shopease.entities.Users;
import com.thecodereveal.shopease.repositories.UsersRepository;
import com.thecodereveal.shopease.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UsersRepository usersRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthService(PasswordEncoder passwordEncoder, UsersRepository usersRepository, JwtUtil jwtUtil) {
        this.passwordEncoder = passwordEncoder;
        this.usersRepository = usersRepository;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Register a new user
     */
    public void registerUser(RegisterRequest request) {
        if (usersRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        Users newUser = Users.builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : "USER")
                .build();

        usersRepository.save(newUser);
    }

    /**
     * Authenticate user and generate a JWT token
     */
    public AuthResponse authenticateUser(AuthRequest request) {
        System.out.println("user.getEmail()" + request.getEmail());

        Users user = usersRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        System.out.println(user.getId());
        String token = jwtUtil.generateToken(user.getId().toString(), user.getEmail());
        return new AuthResponse(token, "Login successful");
    }
}
