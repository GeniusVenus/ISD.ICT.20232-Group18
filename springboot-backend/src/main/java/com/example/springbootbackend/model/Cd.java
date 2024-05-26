package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "cd")
public class Cd {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "albums", nullable = false)
    private String albums;

    @Column(name = "artist", nullable = false)
    private String artist;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "genre")
    private String genre;

    @Column(name = "record_label", nullable = false)
    private String recordLabel;

    @Column(name = "release_date")
    private Instant releaseDate;

    @Column(name = "track_list", nullable = false)
    private String trackList;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

}