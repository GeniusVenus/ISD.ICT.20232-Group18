package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Book;
import com.example.springbootbackend.model.Cd;
import com.example.springbootbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CdRepository extends JpaRepository<Cd, Integer> {
    Optional<Cd> findByProduct(Product product);

}
