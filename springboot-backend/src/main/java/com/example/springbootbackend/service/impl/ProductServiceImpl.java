package com.example.springbootbackend.service.impl;

import com.example.springbootbackend.model.OrderItem;
import com.example.springbootbackend.model.Product;
import com.example.springbootbackend.repository.OrderItemRepository;
import com.example.springbootbackend.repository.ProductRepository;
import com.example.springbootbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, OrderItemRepository orderItemRepository) {
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public void updateQuantity(int productId, int quantity) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        if (product.getQuantity() < quantity) {
            throw new RuntimeException("Not enough quantity available for product ID: " + productId);
        }
        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);
    }
    @Override
    public void updateQuantitiesForOrder(int orderId) {
        List<OrderItem> orderItems = orderItemRepository.findByOrderId(orderId);

        for (OrderItem item : orderItems) {
            updateQuantity(item.getProduct().getId(), item.getQuantity());
        }
    }
}

