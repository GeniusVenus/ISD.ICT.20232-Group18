package com.example.springbootbackend.service;

import com.example.springbootbackend.model.OrderItem;
import com.example.springbootbackend.model.OrderDetail;
import com.example.springbootbackend.model.PaymentDetail;

import java.util.List;
import java.util.Optional;

public interface OrderService {
        List<OrderItem> getOrderItemsByCurrentUser();

        List<OrderItem> getOrderItemsByOrderId(int orderId);


        //        List<OrderItem> getOrderItemsByOrderId(int order_id);
        List<OrderDetail> getAllOrderDetailsByUserId(int user_id);

        OrderDetail getOrderDetail(int orderId);

        PaymentDetail getPaymentDetail(int payment_id);
        PaymentDetail updatePaymentStatus(int paymentId, String status);

        OrderDetail createOrderDetail(OrderDetail orderDetail);

        OrderDetail updateOrderDetail(int orderId, OrderDetail orderDetail);

        boolean deleteOrderDetail(int orderId);

        Optional<OrderItem> getOrderItemById(Integer id);

        OrderItem createOrderItem(OrderItem orderItem);

        Optional<OrderItem> updateOrderItem(Integer id, OrderItem orderItem);

        boolean deleteOrderItem(Integer id);










}