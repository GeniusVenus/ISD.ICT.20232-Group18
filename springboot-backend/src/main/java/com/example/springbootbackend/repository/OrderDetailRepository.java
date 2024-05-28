package com.example.springbootbackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.springbootbackend.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
        List<OrderDetail> findByUserId(Long userId);
}