package com.example.springbootbackend.service.impl;

import com.example.springbootbackend.DTO.ProductRequestDTO;
import com.example.springbootbackend.model.*;
import com.example.springbootbackend.repository.*;
import com.example.springbootbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final OrderItemRepository orderItemRepository;
    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;
    private final CdRepository cdRepository;
    private final DvdRepository dvdRepository;

    public ProductServiceImpl(ProductRepository productRepository, OrderItemRepository orderItemRepository, CategoryRepository categoryRepository, BookRepository bookRepository, CdRepository cdRepository, DvdRepository dvdRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.bookRepository = bookRepository;
        this.orderItemRepository = orderItemRepository;
        this.cdRepository = cdRepository;
        this.dvdRepository = dvdRepository;
    }


    @Override
    public void updateQuantity(int productId, int quantity) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        if (product.getQuantity() < quantity) {
            throw new RuntimeException("Not enough quantity available for product ID: " + productId);
        }

        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);
    }

    @Override
    public void updateQuantitiesForOrder(int orderId) {
        List<OrderItem> orderItems = orderItemRepository.findByOrderId(orderId);

        for (OrderItem item : orderItems) {
            updateQuantity(item.getProduct().getId(), item.getQuantity());
        }
    }

    @Override
    public void addProduct(ProductRequestDTO requestDTO) {

        Category category = categoryRepository.findByName(requestDTO.getCategoryName());
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
        } else if (category.getName().equalsIgnoreCase("cd")) {
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
        } else if (category.getName().equalsIgnoreCase("dvd")) {
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
    }

    @Override
    public void updateProduct(int productId, ProductRequestDTO requestDTO) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Product product = optionalProduct.get();

        product.setDescription(requestDTO.getDescription());
        product.setSku(requestDTO.getSku());
        product.setName(requestDTO.getName()); // Set the name property
        product.setPrice(requestDTO.getPrice());
        product.setQuantity(requestDTO.getQuantity());
        product.setUpdatedAt(Instant.now());
        product.setWeight(requestDTO.getWeight());
        if (product.getCategory().getName().equals("book")) {
            Optional<Book> optionalBook = bookRepository.findByProduct(product);

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
        } else if (product.getCategory().getName().equals("cd")) {
            Optional<Cd> optionalCd = cdRepository.findByProduct(product);


            Cd cd = optionalCd.get();
            cd.setUpdatedAt(Instant.now());
            cd.setGenre(requestDTO.getGenre());
            cd.setArtist(requestDTO.getArtist());
            cd.setAlbums(requestDTO.getAlbums());
            cd.setTrackList(requestDTO.getTrackList());
            cd.setRecordLabel(requestDTO.getRecordLabel());
            cd.setReleaseDate(requestDTO.getReleaseDate());
            cd.setProduct(product);

        } else if (product.getCategory().getName().equals("dvd")) {
            Optional<Dvd> optionalDvd = dvdRepository.findByProduct(product);

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
    }

    @Override
    public void deleteProduct(int productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        Product product = optionalProduct.get();

        String categoryName = product.getCategory().getName();

        switch (categoryName) {
            case "cd":
                Optional<Cd> optionalCd = cdRepository.findByProduct(product);

                Cd cd = optionalCd.get();
                cdRepository.deleteById(cd.getId());
                break;
            case "dvd":
                Optional<Dvd> optionalDvd = dvdRepository.findByProduct(product);

                Dvd dvd = optionalDvd.get();
                dvdRepository.deleteById(dvd.getId());
                break;
            case "book":
                Optional<Book> optionalBook = bookRepository.findByProduct(product);

                Book book = optionalBook.get();
                bookRepository.deleteById(book.getId());
                break;
            default:
                break;
        }

        productRepository.deleteById(productId);
    }

    @Override
    public Optional<Product> getProductById(int productId) {
        return productRepository.findById(productId);
    }


    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Cd> findCdByProduct(Product product) {
        return cdRepository.findByProduct(product);
    }

    @Override
    public Optional<Dvd> findDvdByProduct(Product product) {
        return dvdRepository.findByProduct(product);
    }

    @Override
    public Optional<Book> findBookByProduct(Product product) {
        return bookRepository.findByProduct(product);
    }

    @Override
    public Category getCategoryByName(String categoryName) {
        return categoryRepository.findByName(categoryName);
    }
}