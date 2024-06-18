package com.example.springbootbackend.service;

import com.example.springbootbackend.model.CartItem;

import java.util.List;

public interface CartService {
    List<CartItem> getCartItem(Integer session_Id);
    Object addProductToCart(Integer product_id, Integer quantity,Integer session_id);
    Object updateProductOnCart(Integer product_id, Integer quantity, Integer session_id);
    Object deleteProductFromCart(Integer product_id, Integer session_id);
//    Object payOrder(Integer session_id);

//    Object deleteAllProductFromCart(Integer session_id);
    Object bill(Integer session_id);
}
