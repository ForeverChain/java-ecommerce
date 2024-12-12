package com.thecodereveal.shopease.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thecodereveal.shopease.entities.Users;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Changed to Identity strategy for Long
    private Long id;

    @Column(name = "C_QUANTIFY", nullable = false)
    private Integer quantify;

    @Column(name = "C_PRICE", nullable = false)
    private Integer price;

    @Column(name = "C_DATE", nullable = false)
    private Date date;

    @Column(name = "C_ORDER_SHIPPED", nullable = false)
    private String orderShipped;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private Users users;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = true)
    private Shopping product;
}
