package com.example.springbootbackend.service.impl;

import com.example.springbootbackend.model.CartItem;
import com.example.springbootbackend.repository.CartRepository;
import com.example.springbootbackend.repository.ProductRepository;
import com.example.springbootbackend.repository.SessionRepository;
import com.example.springbootbackend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final SessionRepository sessionRepository;
    @Autowired
    public CartServiceImpl(CartRepository cartRepository, ProductRepository productRepository , SessionRepository sessionRepository){
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.sessionRepository = sessionRepository;
    }


    @Override
    public List<CartItem> getCartItem(Integer session_Id) {
        List<CartItem> optionalCartItem = cartRepository.findAll().stream().filter(cartItem -> cartItem.getSession().getId()==session_Id).collect(Collectors.toList());
        return optionalCartItem;

    }

    @Override
    public Object addProductToCart(Integer productid, Integer quantity, Integer session_id){
        try {



            Integer product = productRepository.findById(productid).get().getQuantity();
            if (product < quantity) {
                return new Error("Product's quantity is not enough");
            }

            boolean check = cartRepository.findAll().stream().noneMatch(cartItem -> cartItem.getProduct().getId().equals(productid) && cartItem.getSession().getId().equals(session_id));
            if (check==true) {
                CartItem newCartItem = new CartItem();
                newCartItem.setProduct(productRepository.findById(productid).get());
                newCartItem.setSession(sessionRepository.findById(session_id).get());
                newCartItem.setQuantity(quantity);
                newCartItem.setSessionId(session_id);
                newCartItem.setProductId(productid);
                newCartItem.setCreatedAt(Instant.now());
                newCartItem.setUpdatedAt(Instant.now());
                cartRepository.save(newCartItem);
                return newCartItem;
            } else {
            CartItem cartItem = cartRepository.findAll().stream().filter(cartItem1 -> cartItem1.getProduct().getId().equals(productid)).collect(Collectors.toList()).get(0);
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            productRepository.findById(productid).get().setQuantity(product - quantity);
            cartRepository.save(cartItem);
            return cartItem;
        }
        } catch (Exception e) {
            return new Error("Can not add product to card");
        }}

    @Override
    public Object updateProductOnCart(Integer productid, Integer quantity, Integer session_id){
        try {
            CartItem cartItem = cartRepository.findAll().stream().filter(cartItem1 -> cartItem1.getProduct().getId().equals(productid)).collect(Collectors.toList()).get(0);
            Integer product = productRepository.findById(productid).get().getQuantity();
            if(quantity==0){
                cartRepository.delete(cartItem);
                return cartItem;
            }
            if (product < quantity) {
                return new Error("Product's quantity is not enough");
            }
            cartItem.setQuantity(quantity);
            cartRepository.save(cartItem);
            return cartItem;
        } catch (Exception e) {
            return new Error("Can not update product on cart");
        }
    }
    @Override
    public Object deleteProductFromCart(Integer productid, Integer session_id){
        try {
            CartItem cartItem = cartRepository.findAll().stream().filter(cartItem1 -> cartItem1.getProduct().getId().equals(productid)).collect(Collectors.toList()).get(0);
            cartRepository.delete(cartItem);
            return cartItem;
        } catch (Exception e) {
            return new Error("Can not delete product from cart");
        }
    }

    @Override
    public Object payOrder(Integer session_id) {
        return null;
    }

    @Override
    public Object deleteAllProductFromCart(Integer session_id){
        try {
            List<CartItem> cartItems = cartRepository.findAll().stream().filter(cartItem -> cartItem.getSession().getId().equals(session_id)).collect(Collectors.toList());
            cartRepository.deleteAll(cartItems);
            return cartItems;
        } catch (Exception e) {
            return new Error("Can not delete all product from cart");
        }
    }
}
