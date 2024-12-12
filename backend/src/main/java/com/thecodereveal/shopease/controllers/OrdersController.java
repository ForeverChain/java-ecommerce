package com.thecodereveal.shopease.controllers;

import com.thecodereveal.shopease.dto.OrdersDto;
import com.thecodereveal.shopease.entities.Orders;
import com.thecodereveal.shopease.entities.Shopping;
import com.thecodereveal.shopease.entities.Users;
import com.thecodereveal.shopease.repositories.OrdersRepository;
import com.thecodereveal.shopease.repositories.ShoppingRepository;
import com.thecodereveal.shopease.repositories.UsersRepository;

import jakarta.persistence.EntityNotFoundException;
import scala.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;
import java.util.List;
import java.util.HashMap;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrdersController {
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ShoppingRepository shoppingRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    // Get all orders
    @GetMapping
    public ResponseEntity<HashMap<String, Object>> getAllOrders() {
        List<Orders> orders = ordersRepository.findAll();

        // Prepare response using HashMap
        HashMap<String, Object> response = new HashMap<>();
        response.put("data", orders); // The list of orders
        response.put("total", orders.size()); // Total count of orders

        return ResponseEntity.ok(response);
    }

    // Get order by ID

    @PostMapping
    public ResponseEntity<HashMap<String, Object>> createOrder(@RequestBody OrdersDto ordersDto) {
        // Validate input data (optional)

        // Create a new Orders object to save the order
        Orders newOrder = new Orders();

        // Set the order details from the DTO
        newOrder.setQuantify(ordersDto.getQuantify());
        newOrder.setPrice(ordersDto.getPrice());
        newOrder.setDate(new Date()); // Adjust to a specific date if needed
        newOrder.setOrderShipped(ordersDto.getOrderShipped());
        Users user = usersRepository.findById(ordersDto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + ordersDto.getUserId()));

        // Fetch the Shopping entity using the shoppingId from ordersDto
        Shopping shopping = shoppingRepository.findById(ordersDto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Shopping entity not found with ID: " + ordersDto.getProductId()));

        // Set the client and product to the order by using the fetched entities
        newOrder.setUsers(user); // Set the user entity
        newOrder.setProduct(shopping); // Set the product entity

        // Save the new order to the database
        Orders savedOrder = ordersRepository.save(newOrder);

        // Prepare the response
        HashMap<String, Object> response = new HashMap<>();
        response.put("order", savedOrder);

        // Return the response with the created order
        return ResponseEntity.ok(response);
    }

    // Update an existing order
    @PutMapping("/{id}")
    public Orders updateOrder(@PathVariable Long id, @RequestBody Orders updatedOrder) {
        Orders order = ordersRepository.findById(id);
        order.setClient(updatedOrder.getClient());
        order.setProduct(updatedOrder.getProduct());
        order.setQuantity(updatedOrder.getQuantity());
        order.setPrice(updatedOrder.getPrice());
        order.setDate(updatedOrder.getDate());
        order.setOrderShipped(updatedOrder.getOrderShipped());
        return ordersRepository.save(order);
    }

    // Delete an order
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {
        ordersRepository.deleteById(id);
        return "Order deleted successfully!";
    }
}
