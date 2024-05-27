package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "shipping_address")
public class ShippingAddress {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}