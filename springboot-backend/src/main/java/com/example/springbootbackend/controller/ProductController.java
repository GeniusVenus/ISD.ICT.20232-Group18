package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.Product;
import com.example.springbootbackend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductController {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;
    private final CdRepository cdRepository;
    private final DvdRepository dvdRepository;

    public ProductController(ProductRepository productRepository, CategoryRepository categoryRepository, BookRepository bookRepository, CdRepository cdRepository, DvdRepository dvdRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.bookRepository = bookRepository;
        this.cdRepository = cdRepository;
        this.dvdRepository = dvdRepository;
    }

    @GetMapping("/product")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") int productId){
        Optional<Product> product = productRepository.findById(productId);
        if(product.isPresent()){
            return ResponseEntity.ok(product.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

}
