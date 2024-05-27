package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "dvd")
public class Dvd {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "director", nullable = false)
    private String director;

    @Column(name = "disc_type", nullable = false)
    private String discType;

    @Column(name = "genre")
    private String genre;

    @Column(name = "language", nullable = false)
    private String language;

    @Column(name = "release_date", nullable = false)
    private Instant releaseDate;

    @Column(name = "runtime", nullable = false)
    private String runtime;

    @Column(name = "studio", nullable = false)
    private String studio;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

}