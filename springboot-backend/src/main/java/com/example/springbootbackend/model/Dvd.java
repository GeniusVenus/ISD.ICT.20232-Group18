package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "dvd", schema = "itss")
public class Dvd {
    private Integer id;

    private Product product;

    private String discType;

    private String director;

    private String runtime;

    private String studio;

    private String language;

    private Instant releaseDate;

    private String genre;

    private Instant createdAt;

    private Instant updatedAt;

    @Id
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    public Product getProduct() {
        return product;
    }

    @Column(name = "disc_type", nullable = false)
    public String getDiscType() {
        return discType;
    }

    @Column(name = "director", nullable = false)
    public String getDirector() {
        return director;
    }

    @Column(name = "runtime", nullable = false)
    public String getRuntime() {
        return runtime;
    }

    @Column(name = "studio", nullable = false)
    public String getStudio() {
        return studio;
    }

    @Column(name = "language", nullable = false)
    public String getLanguage() {
        return language;
    }

    @Column(name = "release_date", nullable = false)
    public Instant getReleaseDate() {
        return releaseDate;
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