package com.thecodereveal.shopease.controllers;

import com.thecodereveal.shopease.entities.Shopping;
import com.thecodereveal.shopease.repositories.ShoppingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.thecodereveal.shopease.dto.ShoppingDto;

import java.util.List;
import java.util.UUID;
import java.nio.file.Files;
import java.util.HashMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/shopping")
@CrossOrigin
public class ShoppingController {

    @Autowired
    private ShoppingRepository shoppingRepository;

    // Get product by ID
    @GetMapping
    public ResponseEntity<HashMap<String, Object>> getAllProducts() {
        // Fetching all products
        List<Shopping> products = shoppingRepository.findAll();

        // Prepare response using HashMap
        HashMap<String, Object> response = new HashMap<>();
        response.put("data", products); // The list of products
        response.put("total", products.size()); // Total count of products

        // Return response with status 200 OK
        return ResponseEntity.ok(response);
    }

    @PostMapping("/shopping/product")
    public Shopping getProductById(@RequestBody Long id) {
        return shoppingRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // Add a new product
    @PostMapping
    public ResponseEntity<HashMap<String, Object>> addProduct(@RequestBody ShoppingDto shoppingDto)
            throws IOException {
        // Assuming `shoppingDto.getImage()` returns the image as a string
        // (e.g., a base64 string, a file path, or a URL)
        Shopping newProduct = new Shopping();
        newProduct.setProduct(shoppingDto.getProduct());
        newProduct.setCategory(shoppingDto.getCategory());
        newProduct.setCost(shoppingDto.getCost() != null ? shoppingDto.getCost().doubleValue() : 0.0);
        newProduct.setDescription(shoppingDto.getDescription());

        // Save the image as a string (e.g., file name, URL, or base64 string)
        String imageString = shoppingDto.getImage(); // Ensure this is properly set in the DTO
        newProduct.setImage(imageString);

        // Save the product to the database
        Shopping savedProduct = shoppingRepository.save(newProduct);

        // Prepare the response
        HashMap<String, Object> response = new HashMap<>();
        response.put("product", savedProduct);

        return ResponseEntity.ok(response);
    }

    // Update an existing product
    @PutMapping("/{id}")
    public Shopping updateProduct(@PathVariable Long id, @RequestBody Shopping updatedProduct) {
        Shopping product = shoppingRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setProduct(updatedProduct.getProduct());
        product.setCost(updatedProduct.getCost());
        product.setCategory(updatedProduct.getCategory());
        product.setImage(updatedProduct.getImage());
        product.setDescription(updatedProduct.getDescription());
        return shoppingRepository.save(product);
    }

    // Delete a product
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        shoppingRepository.deleteById(id);
        return "Product deleted successfully!";
    }

}
