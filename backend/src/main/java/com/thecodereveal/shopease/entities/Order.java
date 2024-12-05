package com.thecodereveal.shopease.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thecodereveal.shopease.entities.Users;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "C_QUANTIFY", nullable = false)
    private Integer quantify;

    @Column(name = "C_PRICE", nullable = false)
    private Integer price;

    @Column(name = "C_DATE", nullable = false)
    private Date date;

    @Column(name = "C_ODER_SHIPPED", nullable = false)
    private String orderShipped;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Shopping product;
}
