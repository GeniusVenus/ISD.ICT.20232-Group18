package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "book")
public class Book {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "cover_type", nullable = false)
    private String coverType;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "genre")
    private String genre;

    @Column(name = "language")
    private String language;

    @Column(name = "number_of_page")
    private Integer numberOfPage;

    @Column(name = "publication_date", nullable = false)
    private Instant publicationDate;

    @Column(name = "publisher", nullable = false)
    private String publisher;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

}