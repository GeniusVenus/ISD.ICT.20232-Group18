package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.Book;
import com.example.springbootbackend.model.Cd;
import com.example.springbootbackend.model.Dvd;
import com.example.springbootbackend.model.Product;
import com.example.springbootbackend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductController {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;
    private final CdRepository cdRepository;
    private final DvdRepository dvdRepository;

    public ProductController(ProductRepository productRepository, CategoryRepository categoryRepository, BookRepository bookRepository, CdRepository cdRepository, DvdRepository dvdRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.bookRepository = bookRepository;
        this.cdRepository = cdRepository;
        this.dvdRepository = dvdRepository;
    }

    @GetMapping("/product")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Map<String, Object>> getProductById(@PathVariable("productId") int productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        String categoryName = product.getCategory().getName();

        Map<String, Object> response = new HashMap<>();
        response.put("id", product.getId());
        response.put("description", product.getDescription());
        response.put("sku", product.getSku());
        response.put("price", product.getPrice());
        response.put("category", categoryName);

        switch (categoryName) {
            case "Cd":
                return getCdResponse(productId, response);
            case "Dvd":
                return getDvdResponse(productId, response);
            case "Book":
                return getBookResponse(productId, response);
            default:
                return ResponseEntity.notFound().build();
        }
    }

    private ResponseEntity<Map<String, Object>> getCdResponse(int productId, Map<String, Object> response) {
        Optional<Cd> optionalCd = cdRepository.findById(productId);
        if (optionalCd.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Cd cd = optionalCd.get();
        response.put("albums", cd.getAlbums());
        response.put("artist", cd.getArtist());
        response.put("recordLabel", cd.getRecordLabel());
        response.put("trackList", cd.getTrackList());
        response.put("genre", cd.getGenre());
        response.put("releaseDate", cd.getReleaseDate());
        response.put("createdAt", cd.getCreatedAt());
        response.put("updatedAt", cd.getUpdatedAt());
        return ResponseEntity.ok(response);
    }

    private ResponseEntity<Map<String, Object>> getDvdResponse(int productId, Map<String, Object> response) {
        Optional<Dvd> optionalDvd = dvdRepository.findById(productId);
        if (optionalDvd.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Dvd dvd = optionalDvd.get();
        response.put("disc_type", dvd.getDiscType());
        response.put("director", dvd.getDirector());
        response.put("runtime", dvd.getRuntime());
        response.put("studio", dvd.getStudio());
        response.put("language", dvd.getLanguage());
        response.put("release_date", dvd.getReleaseDate());
        response.put("genre", dvd.getGenre());
        response.put("created_at", dvd.getCreatedAt());
        response.put("updated_at", dvd.getUpdatedAt());
        return ResponseEntity.ok(response);
    }

    private ResponseEntity<Map<String, Object>> getBookResponse(int productId, Map<String, Object> response) {
        Optional<Book> optionalBook = bookRepository.findById(productId);
        if (optionalBook.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Book book = optionalBook.get();
        response.put("author", book.getAuthor());
        response.put("genre", book.getGenre());
        response.put("language", book.getLanguage());
        response.put("cover_type", book.getCoverType());
        response.put("number_of_page", book.getNumberOfPage());
        response.put("publisher", book.getPublisher());
        response.put("publication_date", book.getPublicationDate());
        response.put("created_at", book.getCreatedAt());
        response.put("update_at", book.getUpdatedAt());
        return ResponseEntity.ok(response);
    }

}
