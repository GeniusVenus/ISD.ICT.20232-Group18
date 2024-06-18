package com.example.springbootbackend.service;


import java.util.List;
public interface ProductService {
    void updateQuantity(int productId, int quantity);
    void updateQuantitiesForOrder(int orderId);
}
