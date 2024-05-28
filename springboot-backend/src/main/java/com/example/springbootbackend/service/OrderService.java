package com.example.springbootbackend.service;

import com.example.springbootbackend.model.OrderItem;
import com.example.springbootbackend.model.OrderDetail;

import java.util.List;

public interface OrderService {
        List<OrderItem> getOrderItemsByCurrentUser();
        List<OrderDetail> getAllOrderDetails();

        OrderDetail getOrderDetail(int orderId);


}