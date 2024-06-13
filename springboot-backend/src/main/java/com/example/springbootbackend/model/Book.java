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

    private String author;

    private String coverType;

    private String publisher;

    private Instant publicationDate;

    private Integer numberOfPage;

    private String language;

    private String genre;

    private Instant createdAt;

    private Instant updatedAt;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    public Product getProduct() {
        return product;
    }

    @Column(name = "author", nullable = false)
    public String getAuthor() {
        return author;
    }
    private String author;

    @Column(name = "cover_type", nullable = false)
    private String coverType;
    public String getCoverType() {
        return coverType;
    }

    @Column(name = "publisher", nullable = false)
    private String publisher;
    public String getPublisher() {
        return publisher;
    }

    @Column(name = "publication_date", nullable = false)
    public Instant getPublicationDate() {
        return publicationDate;
    }
    private Instant publicationDate;

    @Column(name = "number_of_page")
    private Integer numberOfPage;

    @Column(name = "language")
    public String getLanguage() {
        return language;
    }
    private String language;

    @Column(name = "genre")
    public String getGenre() {
        return genre;
    }
    private String genre;

    @Column(name = "created_at")
    public Instant getCreatedAt() {
        return createdAt;
    }
    private Instant createdAt;

    @Column(name = "updated_at")
    public Instant getUpdatedAt() {
        return updatedAt;
    }

    private Instant updatedAt;

}