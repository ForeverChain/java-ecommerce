package com.thecodereveal.shopease.controllers;

import com.thecodereveal.shopease.dto.OrderDetails;
import com.thecodereveal.shopease.dto.OrderRequest;
import com.thecodereveal.shopease.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/order")
@CrossOrigin
public class OrderController {


    @Autowired
    OrderService orderService;



}
