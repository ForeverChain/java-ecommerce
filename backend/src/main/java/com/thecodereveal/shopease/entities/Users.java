package com.thecodereveal.shopease.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "C_USER_NAME", nullable = false)
    private String userName;

    @Column(name = "C_PASSWORD", nullable = false)
    private String password;

    @Column(name = "C_EMAIL", nullable = false)
    private String email;

    @Column(name = "C_ROLE", nullable = false)
    private String role;
}
