package com.example.springbootbackend.DTO;

import com.example.springbootbackend.model.Category;

import java.math.BigDecimal;
import java.time.Instant;

public class ProductRequestDTO {
    private String name;

    private String description;

    private String sku;

    private String categoryName;

    private BigDecimal price;

    private BigDecimal weight;

    private Integer quantity;

    private Instant createdAt;

    private Instant updatedAt;


    //For book

    private String author;

    private String coverType;

    private String publisher;

    private Instant publicationDate;

    private Integer numberOfPage;

    private String language;

    private String genre;

    //For Cd

    private String albums;

    private String artist;

    private String recordLabel;

    private String trackList;

    private Instant releaseDate;

    //For Dvd

    private String discType;

    private String director;

    private String runtime;

    private String studio;

    // Getters and Setters



    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getSku() {
        return sku;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public String getAuthor() {
        return author;
    }

    public String getCoverType() {
        return coverType;
    }

    public String getPublisher() {
        return publisher;
    }

    public Instant getPublicationDate() {
        return publicationDate;
    }

    public Integer getNumberOfPage() {
        return numberOfPage;
    }

    public String getLanguage() {
        return language;
    }

    public String getGenre() {
        return genre;
    }

    public String getAlbums() {
        return albums;
    }

    public String getArtist() {
        return artist;
    }

    public String getRecordLabel() {
        return recordLabel;
    }

    public String getTrackList() {
        return trackList;
    }

    public Instant getReleaseDate() {
        return releaseDate;
    }

    public String getDiscType() {
        return discType;
    }

    public String getDirector() {
        return director;
    }

    public String getRuntime() {
        return runtime;
    }

    public String getStudio() {
        return studio;
    }
}