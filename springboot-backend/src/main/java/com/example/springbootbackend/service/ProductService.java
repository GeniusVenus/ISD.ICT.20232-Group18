package com.example.springbootbackend.service;


import com.example.springbootbackend.DTO.ProductRequestDTO;
import com.example.springbootbackend.model.*;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    void updateQuantity(int productId, int quantity);
    void updateQuantitiesForOrder(int orderId);

    void addProduct(ProductRequestDTO requestDTO);

    void updateProduct(int productId, ProductRequestDTO requestDTO);

    void deleteProduct(int productId);
    Optional<Product> getProductById(int productId);

    List<Product> getAllProduct();

    Optional<Cd> findCdByProduct(Product product);

    Optional<Dvd> findDvdByProduct(Product product);

    Optional<Book> findBookByProduct(Product product);

    Category getCategoryByName(String categoryName);
}
