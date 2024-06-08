package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "book", schema = "itss")
public class Book {
    private Integer id;

    private Product product;

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
    public Product getProduct() {
        return product;
    }

    @Column(name = "author", nullable = false)
    public String getAuthor() {
        return author;
    }

    @Column(name = "cover_type", nullable = false)
    public String getCoverType() {
        return coverType;
    }

    @Column(name = "publisher", nullable = false)
    public String getPublisher() {
        return publisher;
    }

    @Column(name = "publication_date", nullable = false)
    public Instant getPublicationDate() {
        return publicationDate;
    }

    @Column(name = "number_of_page")
    public Integer getNumberOfPage() {
        return numberOfPage;
    }

    @Column(name = "language")
    public String getLanguage() {
        return language;
    }

    @Column(name = "genre")
    public String getGenre() {
        return genre;
    }

    @Column(name = "created_at")
    public Instant getCreatedAt() {
        return createdAt;
    }

    @Column(name = "updated_at")
    public Instant getUpdatedAt() {
        return updatedAt;
    }


}