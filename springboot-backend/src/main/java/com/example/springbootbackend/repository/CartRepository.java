package com.example.springbootbackend.repository;
import com.example.springbootbackend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CartRepository extends JpaRepository<CartItem,Integer>{
}
