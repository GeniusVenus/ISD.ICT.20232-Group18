package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.OrderItem;
import com.example.springbootbackend.model.PaymentDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailRepository extends JpaRepository<PaymentDetail, Long> {
    PaymentDetail findById(int payment_id);
}