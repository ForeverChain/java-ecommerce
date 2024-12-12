package com.thecodereveal.shopease.repositories;

import com.thecodereveal.shopease.entities.Orders;
import com.thecodereveal.shopease.entities.Shopping;
import com.thecodereveal.shopease.entities.Users;
import java.util.Optional;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingRepository extends JpaRepository<Shopping, Long> {
}
