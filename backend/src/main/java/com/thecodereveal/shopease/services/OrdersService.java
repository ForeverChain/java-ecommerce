package com.thecodereveal.shopease.services;

import com.thecodereveal.shopease.entities.Orders;
import com.thecodereveal.shopease.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersService {

    private final OrdersRepository ordersRepository;

    @Autowired
    public OrdersService(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    /**
     * Create a new order
     *
     * @param order the order object to be created
     * @return the saved order
     */
    public Orders createOrder(Orders order) {
        return ordersRepository.save(order);
    }

    /**
     * Retrieve all orders
     *
     * @return a list of all orders
     */
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

    /**
     * Retrieve an order by its ID
     *
     * @param id the ID of the order
     * @return the found order or an exception if not found
     */
    public Orders getOrderById(Long id) {
        return ordersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order with ID " + id + " not found."));
    }

    /**
     * Update an existing order
     *
     * @param id    the ID of the order to be updated
     * @param order the updated order data
     * @return the updated order
     */
    public Orders updateOrder(Long id, Orders order) {
        Orders existingOrder = getOrderById(id);
        existingOrder.setClient(order.getClient());
        existingOrder.setProduct(order.getProduct());
        existingOrder.setQuantity(order.getQuantity());
        existingOrder.setPrice(order.getPrice());
        existingOrder.setDate(order.getDate());
        existingOrder.setOrderShipped(order.getOrderShipped());
        return ordersRepository.save(existingOrder);
    }

    /**
     * Delete an order by its ID
     *
     * @param id the ID of the order to be deleted
     */
    public void deleteOrder(Long id) {
        if (!ordersRepository.existsById(id)) {
            throw new RuntimeException("Order with ID " + id + " does not exist.");
        }
        ordersRepository.deleteById(id);
    }
}
