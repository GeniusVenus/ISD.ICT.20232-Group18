package com.example.springbootbackend.service.impl;

import com.example.springbootbackend.model.OrderItem;
import com.example.springbootbackend.model.OrderDetail;

import com.example.springbootbackend.model.User;
import com.example.springbootbackend.repository.OrderItemRepository;
import com.example.springbootbackend.repository.OrderDetailRepository;
import com.example.springbootbackend.service.OrderService;
import com.example.springbootbackend.service.UserInfoDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderItemRepository orderItemRepository;
    private final OrderDetailRepository orderDetailRepository;



    @Autowired
    public OrderServiceImpl(OrderItemRepository orderItemRepository, OrderDetailRepository orderDetailRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderDetailRepository = orderDetailRepository;
    }


    @Override
    public List<OrderItem> getOrderItemsByCurrentUser() {
        UserInfoDetails currentUserDetails = (UserInfoDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Long> orderIds = Collections.singletonList(Long.valueOf(currentUserDetails.getUser().getId()));
        return orderItemRepository.findByOrderIdIn(orderIds);

    }
    @Override
    public OrderDetail getOrderDetail(int orderId) {
        Optional<OrderDetail> orderDetailOptional = orderDetailRepository.findById(orderId);
        if (orderDetailOptional.isPresent()) {
            return orderDetailOptional.get();
        } else {
//            throw new RuntimeException("OrderDetail not found for id: " + orderId);
            return  null;
        }
    }
    @Override
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }


}