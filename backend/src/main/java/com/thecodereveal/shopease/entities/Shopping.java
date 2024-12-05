package com.thecodereveal.shopease.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="Shopping")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shopping {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "C_PRODUCT", nullable = false)
    private String product;

    @Column(name = "C_COST", nullable = false)
    private Integer cost;

    @Column(name = "C_CATEGORY", nullable = false)
    private String category;

    @Column(name = "C_IMAGE", nullable = false)
    private String image;

    @Column(name = "C_DESCRIPTION", nullable = true)
    private String description;
}
