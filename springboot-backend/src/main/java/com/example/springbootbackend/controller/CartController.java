package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.CartItem;
import com.example.springbootbackend.service.impl.CartServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CartController {
    static class SessionObject {
        private int session_id;

        public int getSession_id() {
            return session_id;
        }

        public void setSession_id(int session_id) {
            this.session_id = session_id;
        }
    }
    private CartServiceImpl cartService;

    public CartController(CartServiceImpl cartService) {
        this.cartService = cartService;
    }
    @GetMapping("/cart")
    public List<CartItem> getCart(@RequestParam Integer session_id){
//        Integer session_id = session.getSession_id();
        try {
            List<CartItem> cart =  cartService.getCartItem(session_id);
            if(cart == null){

                throw new Error("Cart not found");
            }
            return cart;
        }catch (Exception e){
            throw new RuntimeException("Cart not found");
        }
    }
    @PostMapping("/cart/product/{product_id}")
    public ResponseEntity<?> addProductToCart(@PathVariable("product_id") Integer productid, @RequestParam Integer quantity,@RequestParam Integer session_id){
        try {
            var newProduct = cartService.addProductToCart(productid, quantity,session_id);
            if (newProduct == null) {
                return new ResponseEntity<>("Product cannot be added to cart", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>("Product added to cart", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/cart/product/{product_id}")
    public ResponseEntity<?> updateProductOnCart(@PathVariable("product_id") Integer productid, @RequestParam Integer quantity, @RequestParam Integer session_id){
        try {
            var newProduct = cartService.updateProductOnCart(productid, quantity,session_id);
            if (newProduct == null) {
                return new ResponseEntity<>("Error to update cart", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>("Product updated to cart", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/cart/product/{product_id}")
    public ResponseEntity<?> deleteProductFromCart(@PathVariable("product_id") Integer productid, @RequestParam Integer session_id){
        try {
            var newProduct = cartService.deleteProductFromCart(productid,session_id);
            if (newProduct == null) {
                return new ResponseEntity<>("Error to delete cart", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>("Product deleted from cart", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/pay-order")
    public ResponseEntity<?> payOrder(@RequestParam Integer session_id){
        try {
            var newProduct = cartService.payOrder(session_id);
            if (newProduct == null) {
                return new ResponseEntity<>("Error to pay order", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>("Order paid", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
