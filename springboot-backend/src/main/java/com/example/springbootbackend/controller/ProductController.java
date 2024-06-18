package com.example.springbootbackend.controller;

import com.example.springbootbackend.DTO.*;
import com.example.springbootbackend.model.*;
import com.example.springbootbackend.repository.*;
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

    @GetMapping("/view/product")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @GetMapping("/view/product/{productId}")
    public ResponseEntity<Map<String, Object>> getProductById(@PathVariable("productId") int productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            System.out.println("Cannot find product with that ID\n");
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        System.out.println(product.getCategory().getName());
        if (product.getCategory().getName().equals("cd")) {
            Optional<Cd> optionalCd = cdRepository.findByProduct(product);
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
                response.put("recordLabel", cd.getRecordLabel());
                response.put("trackList", cd.getTrackList());
                response.put("genre", cd.getGenre());
                response.put("releaseDate", cd.getReleaseDate());
                response.put("createdAt", cd.getCreatedAt());
                response.put("updatedAt", cd.getUpdatedAt());
                return ResponseEntity.ok(response);
            }
        } else if (product.getCategory().getName().equals("dvd")) {
            Optional<Dvd> optionalDvd = dvdRepository.findByProduct(product);
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
            Optional<Book> optionalBook = bookRepository.findByProduct(product);
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
        Category category = categoryRepository.findByName(categoryName);
        System.out.println(categoryName);
        if (category == null) {
            return ResponseEntity.badRequest().body("Invalid category name.");
        }



        // Create and set up the Product entity
        Product product = new Product();
        product.setDescription(requestDTO.getDescription());
        product.setSku(requestDTO.getSku());
        product.setName(requestDTO.getName()); // Set the name property
        product.setPrice(requestDTO.getPrice());
        product.setCategory(category); // Set the found Category entity
        product.setQuantity(requestDTO.getQuantity());
        product.setCreatedAt(Instant.now());
        product.setUpdatedAt(Instant.now());
        product.setWeight(requestDTO.getWeight());
        productRepository.save(product);

        if (category.getName().equalsIgnoreCase("book")) {
            Book book = new Book();
            book.setAuthor(requestDTO.getAuthor());
            book.setPublisher(requestDTO.getPublisher());
            book.setLanguage(requestDTO.getLanguage());
            book.setGenre(requestDTO.getGenre());
            book.setCoverType(requestDTO.getCoverType());
            book.setNumberOfPage(requestDTO.getNumberOfPage());
            book.setPublicationDate(requestDTO.getPublicationDate());
            book.setCreatedAt(Instant.now());
            book.setUpdatedAt(Instant.now());
            book.setProduct(product);

            bookRepository.save(book);
        }
        else if(category.getName().equalsIgnoreCase("cd")){
            Cd cd = new Cd();
            cd.setCreatedAt(Instant.now());
            cd.setUpdatedAt(Instant.now());
            cd.setGenre(requestDTO.getGenre());
            cd.setArtist(requestDTO.getArtist());
            cd.setAlbums(requestDTO.getAlbums());
            cd.setTrackList(requestDTO.getTrackList());
            cd.setRecordLabel(requestDTO.getRecordLabel());
            cd.setReleaseDate(requestDTO.getReleaseDate());
            cd.setProduct(product);

            cdRepository.save(cd);
        }
        else if(category.getName().equalsIgnoreCase("dvd")){
            Dvd dvd = new Dvd();
            dvd.setCreatedAt(Instant.now());
            dvd.setUpdatedAt(Instant.now());
            dvd.setGenre(requestDTO.getGenre());
            dvd.setLanguage(requestDTO.getLanguage());
            dvd.setStudio(requestDTO.getStudio());
            dvd.setDirector(requestDTO.getDirector());
            dvd.setDiscType(requestDTO.getDiscType());
            dvd.setReleaseDate(requestDTO.getReleaseDate());
            dvd.setRuntime(requestDTO.getRuntime());
            dvd.setProduct(product);

            dvdRepository.save(dvd);
        }
        return ResponseEntity.ok("Product created successfully");
    }
    @PutMapping("/update/product/{productId}")
    public ResponseEntity<String> updateProduct(@PathVariable("productId") int productId, @RequestBody ProductRequestDTO requestDTO) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        product.setDescription(requestDTO.getDescription());
        product.setSku(requestDTO.getSku());
        product.setName(requestDTO.getName()); // Set the name property
        product.setPrice(requestDTO.getPrice());
        product.setQuantity(requestDTO.getQuantity());
        product.setUpdatedAt(Instant.now());
        product.setWeight(requestDTO.getWeight());

        if (product.getCategory().getName().equalsIgnoreCase("book")) {
            Optional<Book> optionalBook = bookRepository.findByProduct(product);

            if (optionalBook.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Book book = optionalBook.get();
            book.setAuthor(requestDTO.getAuthor());
            book.setPublisher(requestDTO.getPublisher());
            book.setLanguage(requestDTO.getLanguage());
            book.setGenre(requestDTO.getGenre());
            book.setCoverType(requestDTO.getCoverType());
            book.setNumberOfPage(requestDTO.getNumberOfPage());
            book.setPublicationDate(requestDTO.getPublicationDate());
            book.setUpdatedAt(Instant.now());
            book.setProduct(product);
        }
        else if (product.getCategory().getName().equalsIgnoreCase("cd")){
            Optional<Cd> optionalCd = cdRepository.findByProduct(product);

            if (optionalCd.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Cd cd = optionalCd.get();
            cd.setUpdatedAt(Instant.now());
            cd.setGenre(requestDTO.getGenre());
            cd.setArtist(requestDTO.getArtist());
            cd.setAlbums(requestDTO.getAlbums());
            cd.setTrackList(requestDTO.getTrackList());
            cd.setRecordLabel(requestDTO.getRecordLabel());
            cd.setReleaseDate(requestDTO.getReleaseDate());
            cd.setProduct(product);

        }

        else if (product.getCategory().getName().equalsIgnoreCase("dvd")){
            Optional<Dvd> optionalDvd = dvdRepository.findByProduct(product);

            if (optionalDvd.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Dvd dvd = optionalDvd.get();
            dvd.setUpdatedAt(Instant.now());
            dvd.setGenre(requestDTO.getGenre());
            dvd.setLanguage(requestDTO.getLanguage());
            dvd.setStudio(requestDTO.getStudio());
            dvd.setDirector(requestDTO.getDirector());
            dvd.setDiscType(requestDTO.getDiscType());
            dvd.setReleaseDate(requestDTO.getReleaseDate());
            dvd.setRuntime(requestDTO.getRuntime());
            dvd.setProduct(product);

        }
        productRepository.save(product);
        return ResponseEntity.ok("Product updated successfully");
    }

    @DeleteMapping("/delete/product/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") int productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        String categoryName = product.getCategory().getName();

        switch (categoryName) {
            case "cd":
                Optional<Cd> optionalCd = cdRepository.findByProduct(product);
                if (optionalCd.isEmpty()) {
                    return ResponseEntity.notFound().build();
                }
                Cd cd = optionalCd.get();
                cdRepository.deleteById(cd.getId());
                break;
            case "dvd":
                Optional<Dvd> optionalDvd = dvdRepository.findByProduct(product);
                if (optionalDvd.isEmpty()) {
                    return ResponseEntity.notFound().build();
                }
                Dvd dvd = optionalDvd.get();
                dvdRepository.deleteById(dvd.getId());
                break;
            case "book":
                Optional<Book> optionalBook = bookRepository.findByProduct(product);
                if (optionalBook.isEmpty()) {
                    return ResponseEntity.notFound().build();
                }
                Book book = optionalBook.get();
                bookRepository.deleteById(book.getId());
                break;
            default:
                return ResponseEntity.badRequest().body("Invalid category");
        }

        productRepository.deleteById(productId);
        return ResponseEntity.ok("Product deleted successfully");
    }
    @PostMapping("/add/product")
    public ResponseEntity<String> createProduct(@RequestBody ProductRequestDTO requestDTO) {
        String categoryName = requestDTO.getCategoryName();
        Category category = categoryRepository.findByName(categoryName);
        if (category == null) {
            return ResponseEntity.badRequest().body("Invalid category name");
        }

        // Create and set up the Product entity
        Product product = new Product();
        product.setDescription(requestDTO.getDescription());
        product.setSku(requestDTO.getSku());
        product.setName(requestDTO.getName()); // Set the name property
        product.setPrice(requestDTO.getPrice());
        product.setCategory(category); // Set the found Category entity
        product.setQuantity(requestDTO.getQuantity());
        product.setCreatedAt(requestDTO.getCreatedAt());
        product.setUpdatedAt(requestDTO.getUpdatedAt());
        product.setWeight(requestDTO.getWeight());
        productRepository.save(product);

        if (category.getName().equalsIgnoreCase("Book")) {
            Book book = new Book();
            book.setAuthor(requestDTO.getAuthor());
            book.setPublisher(requestDTO.getPublisher());
            book.setLanguage(requestDTO.getLanguage());
            book.setGenre(requestDTO.getGenre());
            book.setCoverType(requestDTO.getCoverType());
            book.setNumberOfPage(requestDTO.getNumberOfPage());
            book.setPublicationDate(requestDTO.getPublicationDate());
            book.setCreatedAt(requestDTO.getCreatedAt());
            book.setUpdatedAt(requestDTO.getUpdatedAt());
            book.setProduct(product);

            bookRepository.save(book);
        }
        else if(category.getName().equalsIgnoreCase("Cd")){
            Cd cd = new Cd();
            cd.setCreatedAt(requestDTO.getCreatedAt());
            cd.setUpdatedAt(requestDTO.getUpdatedAt());
            cd.setGenre(requestDTO.getGenre());
            cd.setArtist(requestDTO.getArtist());
            cd.setAlbums(requestDTO.getAlbums());
            cd.setTrackList(requestDTO.getTrackList());
            cd.setRecordLabel(requestDTO.getRecordLabel());
            cd.setReleaseDate(requestDTO.getReleaseDate());
            cd.setProduct(product);

            cdRepository.save(cd);
        }
        else if(category.getName().equalsIgnoreCase("Dvd")){
            Dvd dvd = new Dvd();
            dvd.setCreatedAt(requestDTO.getCreatedAt());
            dvd.setUpdatedAt(requestDTO.getUpdatedAt());
            dvd.setGenre(requestDTO.getGenre());
            dvd.setLanguage(requestDTO.getLanguage());
            dvd.setStudio(requestDTO.getStudio());
            dvd.setDirector(requestDTO.getDirector());
            dvd.setDiscType(requestDTO.getDiscType());
            dvd.setReleaseDate(requestDTO.getReleaseDate());
            dvd.setRuntime(requestDTO.getRuntime());
            dvd.setProduct(product);

            dvdRepository.save(dvd);
        }
        return ResponseEntity.ok("Product created successfully");
    }

    @PutMapping("/update/product/{productId}")
    public ResponseEntity<String> updateProduct(@PathVariable("productId") int productId, @RequestBody ProductRequestDTO requestDTO) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        product.setDescription(requestDTO.getDescription());
        product.setSku(requestDTO.getSku());
        product.setName(requestDTO.getName()); // Set the name property
        product.setPrice(requestDTO.getPrice());
        product.setQuantity(requestDTO.getQuantity());
        product.setUpdatedAt(requestDTO.getUpdatedAt());
        product.setWeight(requestDTO.getWeight());

        if (product.getCategory().getName().equalsIgnoreCase("Book")) {
            Optional<Book> optionalBook = bookRepository.findByProduct(product);

            if (optionalBook.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Book book = optionalBook.get();
            book.setAuthor(requestDTO.getAuthor());
            book.setPublisher(requestDTO.getPublisher());
            book.setLanguage(requestDTO.getLanguage());
            book.setGenre(requestDTO.getGenre());
            book.setCoverType(requestDTO.getCoverType());
            book.setNumberOfPage(requestDTO.getNumberOfPage());
            book.setPublicationDate(requestDTO.getPublicationDate());
            book.setUpdatedAt(requestDTO.getUpdatedAt());
            book.setProduct(product);
        }
        else if (product.getCategory().getName().equalsIgnoreCase("Cd")){
            Optional<Cd> optionalCd = cdRepository.findByProduct(product);

            if (optionalCd.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Cd cd = optionalCd.get();
            cd.setUpdatedAt(requestDTO.getUpdatedAt());
            cd.setGenre(requestDTO.getGenre());
            cd.setArtist(requestDTO.getArtist());
            cd.setAlbums(requestDTO.getAlbums());
            cd.setTrackList(requestDTO.getTrackList());
            cd.setRecordLabel(requestDTO.getRecordLabel());
            cd.setReleaseDate(requestDTO.getReleaseDate());
            cd.setProduct(product);

        }

        else if (product.getCategory().getName().equalsIgnoreCase("Dvd")){
            Optional<Dvd> optionalDvd = dvdRepository.findByProduct(product);

            if (optionalDvd.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Dvd dvd = optionalDvd.get();
            dvd.setUpdatedAt(requestDTO.getUpdatedAt());
            dvd.setGenre(requestDTO.getGenre());
            dvd.setLanguage(requestDTO.getLanguage());
            dvd.setStudio(requestDTO.getStudio());
            dvd.setDirector(requestDTO.getDirector());
            dvd.setDiscType(requestDTO.getDiscType());
            dvd.setReleaseDate(requestDTO.getReleaseDate());
            dvd.setRuntime(requestDTO.getRuntime());
            dvd.setProduct(product);

        }
        productRepository.save(product);
        return ResponseEntity.ok("Product updated successfully");
    }

    @DeleteMapping("/delete/product/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") int productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        String categoryName = product.getCategory().getName();

        switch (categoryName) {
            case "Cd":
                Optional<Cd> optionalCd = cdRepository.findByProduct(product);
                if (optionalCd.isEmpty()) {
                    return ResponseEntity.notFound().build();
                }
                Cd cd = optionalCd.get();
                cdRepository.deleteById(cd.getId());
                break;
            case "Dvd":
                Optional<Dvd> optionalDvd = dvdRepository.findByProduct(product);
                if (optionalDvd.isEmpty()) {
                    return ResponseEntity.notFound().build();
                }
                Dvd dvd = optionalDvd.get();
                dvdRepository.deleteById(dvd.getId());
                break;
            case "Book":
                Optional<Book> optionalBook = bookRepository.findByProduct(product);
                if (optionalBook.isEmpty()) {
                    return ResponseEntity.notFound().build();
                }
                Book book = optionalBook.get();
                bookRepository.deleteById(book.getId());
                break;
            default:
                return ResponseEntity.badRequest().body("Invalid category");
        }

        productRepository.deleteById(productId);
        return ResponseEntity.ok("Product deleted successfully");
    }

}
