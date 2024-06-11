package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.OrderItem;
import com.example.springbootbackend.model.OrderDetail;
import com.example.springbootbackend.model.PaymentDetail;
import com.example.springbootbackend.repository.*;

import com.example.springbootbackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    private int payment_id;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{order_id}")
    public ResponseEntity<?> getOrderDetail(@PathVariable("order_id") int order_id) {
        OrderDetail orderDetail = orderService.getOrderDetail(order_id);
        List<OrderItem> orderItems = orderService.getOrderItemsByCurrentUser();
        PaymentDetail paymentDetail = orderService.getPaymentDetail(order_id);

        if (orderDetail != null) {
            payment_id = orderDetail.getPayment().getId();
            List<Map<String, Object>> matchingOrderItems = new ArrayList<>();
            for (OrderItem item : orderItems) {
                if (item.getOrder().getId() == order_id) {
                    Map<String, Object> orderItemMap = new HashMap<>();
                    orderItemMap.put("id", item.getId());
                    orderItemMap.put("order_id", item.getOrder().getId());
                    orderItemMap.put("product", item.getProduct());
                    orderItemMap.put("quantity", item.getQuantity());
                    matchingOrderItems.add(orderItemMap);
                }
            }

            Map<String, Object> response = new HashMap<>();
            response.put("id", orderDetail.getId());
            response.put("user_id", orderDetail.getUser().getId());
            response.put("total", orderDetail.getTotal());
//            response.put("payment_id", orderDetail.getPayment());
            response.put("order_items", matchingOrderItems);

            response.put("createdAt",orderDetail.getCreatedAt());
            response.put("updateAt",orderDetail.getUpdatedAt());

            response.put("payment_id",paymentDetail.getId());
            response.put("status",paymentDetail.getStatus());
            response.put("amount",paymentDetail.getAmount());
            response.put("provider",paymentDetail.getProvider());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }




    @GetMapping("/{user_id}")
    public ResponseEntity<List<Map<String, Object>>> getOrderItemsByCurrentUser() {
        List<OrderItem> orderItems = orderService.getOrderItemsByCurrentUser();
        List<Map<String, Object>> response = orderItems.stream()
                .map(orderItem -> {
                    Map<String, Object> orderMap = new HashMap<>();
                    orderMap.put("id", orderItem.getId());
                    orderMap.put("order_id", orderItem.getId());
                    orderMap.put("product_id", orderItem.getProduct().getId());
                    orderMap.put("quantity", orderItem.getQuantity());
                    return orderMap;
                })
                .collect(Collectors.toList());
        System.out.println(response);
        return ResponseEntity.ok(response);
    }



}