package com.example.springbootbackend.service.impl;

import com.example.springbootbackend.repository.ProductRepository;
import com.example.springbootbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository){
        this.productRepository=  productRepository;
    }


}
