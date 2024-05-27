package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.ShoppingSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<ShoppingSession, Integer>{
}
