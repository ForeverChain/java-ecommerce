package com.thecodereveal.shopease.services;

import com.thecodereveal.shopease.entities.Shopping;
import com.thecodereveal.shopease.repositories.ShoppingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingService {

    private final ShoppingRepository shoppingRepository;

    @Autowired
    public ShoppingService(ShoppingRepository shoppingRepository) {
        this.shoppingRepository = shoppingRepository;
    }

    public Shopping addProduct(Shopping product) {
        return shoppingRepository.save(product);
    }

    public List<Shopping> getAllProducts() {
        return shoppingRepository.findAll();
    }

    public Shopping getProductById(Long id) {
        return shoppingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found."));
    }

    public void deleteProduct(Long id) {
        shoppingRepository.deleteById(id);
    }
}
