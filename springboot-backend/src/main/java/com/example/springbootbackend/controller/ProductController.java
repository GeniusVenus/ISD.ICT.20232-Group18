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
            System.out.println("Cannot find product with that ID\n");
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        System.out.println(product.getCategory().getName());
        if (product.getCategory().getName().equals("Cd")) {
            Optional<Cd> optionalCd = cdRepository.findById(productId);
            if (optionalCd.isPresent()) {
                System.out.println("Found CD\n");
                Cd cd = optionalCd.get();
                Map<String, Object> response = new HashMap<>();
                response.put("id", cd.getId());
                response.put("description", product.getDescription());
                response.put("sku", product.getSku());
                response.put("price", product.getPrice());
                response.put("category", "Cd");
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
        } else if (product.getCategory().getName().equals("Dvd")) {
            Optional<Dvd> optionalDvd = dvdRepository.findById(productId);
            if (optionalDvd.isPresent()) {
                Dvd dvd = optionalDvd.get();
                Map<String, Object> response = new HashMap<>();
                response.put("id", dvd.getId());
                response.put("description", product.getDescription());
                response.put("sku", product.getSku());
                response.put("price", product.getPrice());
                response.put("category", "Dvd");
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
        } else if (product.getCategory().getName().equals("Book")) {
            Optional<Book> optionalBook = bookRepository.findById(productId);
            if (optionalBook.isPresent()) {
                Book book = optionalBook.get();
                Map<String, Object> response = new HashMap<>();
                response.put("id", book.getId());
                response.put("description", product.getDescription());
                response.put("sku", product.getSku());
                response.put("price", product.getPrice());
                response.put("category", "Book");
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
        System.out.println("Not found corresponding category\n");
        return ResponseEntity.notFound().build();
    }

}
