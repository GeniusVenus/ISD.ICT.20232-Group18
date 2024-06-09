package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Dvd;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DvdRepository extends JpaRepository<Dvd, Integer> {

}
