package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Dvd;
import com.example.springbootbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DvdRepository extends JpaRepository<Dvd, Integer> {

    Optional<Dvd> findByProduct(Product product);
}
