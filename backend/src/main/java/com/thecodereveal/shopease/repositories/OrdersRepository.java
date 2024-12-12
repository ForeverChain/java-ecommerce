package com.thecodereveal.shopease.repositories;

import com.thecodereveal.shopease.entities.Orders;
import com.thecodereveal.shopease.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {

    List<Orders> findByUsers(Users users);
}
