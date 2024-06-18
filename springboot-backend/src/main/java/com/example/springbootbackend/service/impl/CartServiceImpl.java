package com.example.springbootbackend.service.impl;

import com.example.springbootbackend.model.CartItem;
import com.example.springbootbackend.model.User;
import com.example.springbootbackend.repository.CartRepository;
import com.example.springbootbackend.repository.ProductRepository;
import com.example.springbootbackend.repository.SessionRepository;
import com.example.springbootbackend.repository.UserRepository;
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
    private final UserRepository userRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, ProductRepository productRepository , SessionRepository sessionRepository, UserRepository userRepository){
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
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

            boolean check = cartRepository.findAll().stream().allMatch(cartItem -> cartItem.getProduct().getId().equals(productid) && cartItem.getSession().getId().equals(session_id));
            if (check==false) {
                CartItem newCartItem = new CartItem();
                newCartItem.setProduct(productRepository.findById(productid).get());
                newCartItem.setSession(sessionRepository.findById(session_id).get());
                newCartItem.setQuantity(quantity);
                newCartItem.getProduct().setId(productid);
                newCartItem.getSession().setId(session_id);
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
    public Object bill(Integer session_id){
        try {
            List<CartItem> cartItems = cartRepository.findAll().stream().filter(cartItem -> cartItem.getSession().getId().equals(session_id)).collect(Collectors.toList());
            if(cartItems.size()==0){
                return new Error("Cart is empty");
            }
            User user = userRepository.findById(sessionRepository.findById(session_id).get().getUser().getId()).get();
            return user;
        } catch (Exception e) {
            return new Error("Can not bill");
        }
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
