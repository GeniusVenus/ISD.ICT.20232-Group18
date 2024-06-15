package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "cd", schema = "itss")
public class Cd {
    private Integer id;

    private Product product;

    private String albums;

    private String artist;

    private String recordLabel;

    private String trackList;

    private String genre;

    private Instant releaseDate;

    private Instant createdAt;

    private Instant updatedAt;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)

    public Integer getId() {
        return id;
    }

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    public Product getProduct() {
        return product;
    }

    @Column(name = "albums", nullable = false)
    public String getAlbums() {
        return albums;
    }

    @Column(name = "artist", nullable = false)
    public String getArtist() {
        return artist;
    }

    @Column(name = "record_label", nullable = false)
    public String getRecordLabel() {
        return recordLabel;
    }

    @Column(name = "track_list", nullable = false)
    public String getTrackList() {
        return trackList;
    }

    @Column(name = "genre")
    public String getGenre() {
        return genre;
    }

    @Column(name = "release_date")
    public Instant getReleaseDate() {
        return releaseDate;
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