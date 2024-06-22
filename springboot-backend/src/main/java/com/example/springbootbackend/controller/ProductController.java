package com.example.springbootbackend.controller;

import com.example.springbootbackend.DTO.*;
import com.example.springbootbackend.model.*;
import com.example.springbootbackend.repository.*;
import com.example.springbootbackend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductController {
    private final ProductService productService;


    public ProductController(ProductService productService, ProductRepository productRepository, CategoryRepository categoryRepository, BookRepository bookRepository, CdRepository cdRepository, DvdRepository dvdRepository) {
        this.productService = productService;

    }

    @GetMapping("/view/product")
    public List<Product> getAllProducts(){
        return productService.getAllProduct();
    }

    @GetMapping("/view/product/{productId}")
    public ResponseEntity<Map<String, Object>> getProductById(@PathVariable("productId") int productId) {
        Optional<Product> optionalProduct = productService.getProductById(productId);
        if (optionalProduct.isEmpty()) {
            System.out.println("Cannot find product with that ID\n");
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        System.out.println(product.getCategory().getName());
        if (product.getCategory().getName().equals("cd")) {
            Optional<Cd> optionalCd = productService.findCdByProduct(product);
            if (optionalCd.isPresent()) {
                System.out.println("Found CD\n");
                Cd cd = optionalCd.get();
                Map<String, Object> response = new HashMap<>();
                response.put("id", product.getId());
                response.put("name", product.getName());
                response.put("quantity", product.getQuantity());
                response.put("weight", product.getWeight());
                response.put("description", product.getDescription());
                response.put("sku", product.getSku());
                response.put("price", product.getPrice());
                response.put("category", "cd");
                response.put("albums", cd.getAlbums());
                response.put("artist", cd.getArtist());
                response.put("record_label", cd.getRecordLabel());
                response.put("track_list", cd.getTrackList());
                response.put("genre", cd.getGenre());
                response.put("release_date", cd.getReleaseDate());
                response.put("createdAt", cd.getCreatedAt());
                response.put("updatedAt", cd.getUpdatedAt());
                return ResponseEntity.ok(response);
            }
        } else if (product.getCategory().getName().equals("dvd")) {
            Optional<Dvd> optionalDvd = productService.findDvdByProduct(product);
            if (optionalDvd.isPresent()) {
                Dvd dvd = optionalDvd.get();
                Map<String, Object> response = new HashMap<>();
                response.put("id", product.getId());
                response.put("name", product.getName());
                response.put("quantity", product.getQuantity());
                response.put("weight", product.getWeight());
                response.put("description", product.getDescription());
                response.put("sku", product.getSku());
                response.put("price", product.getPrice());
                response.put("category", "dvd");
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
        } else if (product.getCategory().getName().equals("book")) {
            Optional<Book> optionalBook = productService.findBookByProduct(product);
            if (optionalBook.isPresent()) {
                Book book = optionalBook.get();
                Map<String, Object> response = new HashMap<>();
                response.put("id", product.getId());
                response.put("name", product.getName());
                response.put("quantity", product.getQuantity());
                response.put("weight", product.getWeight());
                response.put("description", product.getDescription());
                response.put("sku", product.getSku());
                response.put("price", product.getPrice());
                response.put("category", "book");
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
    @PostMapping("/add/product")
    public ResponseEntity<String> createProduct(@RequestBody ProductRequestDTO requestDTO) {
        String categoryName = requestDTO.getCategoryName().toLowerCase();
        Category category = productService.getCategoryByName(categoryName);
        System.out.println(categoryName);
        if (category == null) {
            return ResponseEntity.badRequest().body("Invalid category name.");
        }

        productService.addProduct(requestDTO);

        return ResponseEntity.ok("Product created successfully");
    }
    @PutMapping("/update/product/{productId}")
    public ResponseEntity<String> updateProduct(@PathVariable("productId") int productId, @RequestBody ProductRequestDTO requestDTO) {
        Optional<Product> optionalProduct = productService.getProductById(productId);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        productService.updateProduct(productId, requestDTO);


        return ResponseEntity.ok("Product updated successfully");
    }

    @DeleteMapping("/delete/product/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") int productId) {
        Optional<Product> optionalProduct = productService.getProductById(productId);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        productService.deleteProduct(productId);

        return ResponseEntity.ok("Product deleted successfully");
    }


}