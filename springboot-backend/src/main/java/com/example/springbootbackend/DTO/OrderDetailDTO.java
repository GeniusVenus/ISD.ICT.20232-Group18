package com.example.springbootbackend.DTO;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public class OrderDetailDTO {
    private Integer id;
    private Integer userId;
    private BigDecimal total;
    private PaymentDetailDTO payment;
    private List<OrderItemDTO> orderItems;
    private Instant createdAt;
    private Instant updatedAt;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public PaymentDetailDTO getPayment() {
        return payment;
    }

    public void setPayment(PaymentDetailDTO payment) {
        this.payment = payment;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
