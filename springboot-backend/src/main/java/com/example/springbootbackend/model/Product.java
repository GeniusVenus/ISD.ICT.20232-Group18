package com.example.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity

@Table(name = "product", schema = "itss")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {
    private Integer id;

    private String name;

    private String description;

    private String sku;

    private Category category;

    private BigDecimal price;

    private BigDecimal weight;

    private Integer quantity;

    private Instant createdAt;

    private Instant updatedAt;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)

    public Integer getId() {
        return id;
    }

    @Column(name = "name", nullable = false)
    public String getName() {
        return name;
    }

    @Column(name = "description", nullable = false)
    public String getDescription() {
        return description;
    }

    @Column(name = "SKU", nullable = false, length = 8)
    public String getSku() {
        return sku;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    public Category getCategory() {
        return category;
    }

    @Column(name = "price", nullable = false, precision = 10)
    public BigDecimal getPrice() {
        return price;
    }

    @Column(name = "quantity", nullable = false)
    public Integer getQuantity() {
        return quantity;
    }

    @Column(name = "created_at")
    public Instant getCreatedAt() {
        return createdAt;
    }

    @Column(name = "updated_at")
    public Instant getUpdatedAt() {
        return updatedAt;
    }

    @Column(name = "weight")
    public BigDecimal getWeight(){ return weight;}
}