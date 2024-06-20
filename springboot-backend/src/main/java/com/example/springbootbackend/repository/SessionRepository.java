package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.ShoppingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SessionRepository extends JpaRepository<ShoppingSession, Integer>{
    @Query("select s from ShoppingSession s where s.user.id = ?1 order by s.id desc limit 1")
    ShoppingSession findLatestSessionByUserId(Integer userId);
}
