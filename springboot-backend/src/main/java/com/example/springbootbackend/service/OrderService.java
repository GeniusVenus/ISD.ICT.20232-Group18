package com.example.springbootbackend.service;

import com.example.springbootbackend.model.OrderItem;
import com.example.springbootbackend.model.OrderDetail;
import com.example.springbootbackend.model.PaymentDetail;

import java.util.List;

public interface OrderService {
        List<OrderItem> getOrderItemsByCurrentUser();

        List<OrderItem> getOrderItems();
        List<OrderDetail> getAllOrderDetails();

        OrderDetail getOrderDetail(int orderId);

        PaymentDetail getPaymentDetail(int payment_id);



}