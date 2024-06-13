package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Book;
import com.example.springbootbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Integer> {

    Optional<Book> findByProduct(Product product);
}
