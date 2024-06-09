package com.example.springbootbackend.DTO;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
@Data
@Builder
public class CdDTO {
    private int id;
    private String description;
    private String sku;
    private double price;
    private String category;
    private String albums;
    private String artist;
    private String recordLabel;
    private String trackList;
    private String genre;
    private Instant releaseDate;
    private Instant createdAt;
    private Instant updatedAt;
}