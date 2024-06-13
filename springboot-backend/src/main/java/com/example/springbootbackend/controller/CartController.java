package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.CartItem;
import com.example.springbootbackend.service.impl.CartServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/cart")
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
    @GetMapping("")
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
    @PostMapping("/product/{product_id}")
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

    @PutMapping("/product/{product_id}")
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

    @DeleteMapping("/product/{product_id}")
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

    @GetMapping("/bill")
    public ResponseEntity<?> bill(HttpServletRequest request){
        try {
            Map<String, String> responseAttributes = new HashMap<>();
            String orderInfo = request.getParameter("vnp_OrderInfo");
            String paymentTime = request.getParameter("vnp_PayDate");
            String transactionId = request.getParameter("vnp_TransactionNo");
            String totalPrice = request.getParameter("vnp_Amount");


            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");

            Date paymentTimeConverted = formatter.parse(paymentTime);
            responseAttributes.put("orderId", orderInfo);
            responseAttributes.put("totalPrice", String.valueOf(Integer.parseInt(totalPrice)/100));
            responseAttributes.put("paymentTime", String.valueOf(paymentTimeConverted));
            responseAttributes.put("transactionId", transactionId);

            return new ResponseEntity<>(responseAttributes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
