package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Cd;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CdRepository extends JpaRepository<Cd, Integer> {
}
