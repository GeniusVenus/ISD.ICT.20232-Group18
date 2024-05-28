package com.example.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "payment_details")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class PaymentDetail {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "amount", nullable = false, precision = 10)
    private BigDecimal amount;

    @Column(name = "provider", nullable = false)
    private String provider;

    @ColumnDefault("'pending'")
    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

}