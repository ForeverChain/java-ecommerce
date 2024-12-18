package com.thecodereveal.shopease.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Shopping")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shopping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Changed to Identity strategy for Long
    private Long id; // Changed UUID to Long

    @Column(name = "C_PRODUCT", nullable = false)
    private String product;

    @Column(name = "C_COST", nullable = false)
    private Double cost;

    @Column(name = "C_CATEGORY", nullable = false)
    private String category;

    @Column(name = "C_IMAGE", nullable = true)
    private String image;

    @Column(name = "C_DESCRIPTION", nullable = true)
    private String description;
}
