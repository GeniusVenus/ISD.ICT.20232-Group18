package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.OrderItem;
import com.example.springbootbackend.model.OrderDetail;
import com.example.springbootbackend.repository.*;

import com.example.springbootbackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/test")
    public ResponseEntity<List<Map<String, Object>>> getAllOrderDetails() {
        List<OrderDetail> orderDetails = orderService.getAllOrderDetails();
        List<Map<String, Object>> response = orderDetails.stream()
                .map(orderDetail -> {
                    Map<String, Object> orderMap = new HashMap<>();
                    orderMap.put("id", orderDetail.getId());
                    orderMap.put("user_id", orderDetail.getUser().getId());
                    orderMap.put("total", orderDetail.getTotal());
                    return orderMap;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderDetail(@PathVariable("orderId") int orderId) {
        OrderDetail orderDetail = orderService.getOrderDetail(orderId);

        if (orderDetail != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", orderDetail.getId());
            response.put("user_id", orderDetail.getUser().getId());
            response.put("total", orderDetail.getTotal());
            response.put("payment_id", orderDetail.getPayment().getId());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("")
    public ResponseEntity<List<Map<String, Object>>> getOrderItemsByCurrentUser() {
        List<OrderItem> orderItems = orderService.getOrderItemsByCurrentUser();
        List<Map<String, Object>> response = orderItems.stream()
                .map(orderItem -> {
                    Map<String, Object> orderMap = new HashMap<>();
                    orderMap.put("id", orderItem.getId());
                    orderMap.put("order_id", orderItem.getOrder().getId());
                    orderMap.put("product_id", orderItem.getProduct());
                    orderMap.put("quantity", orderItem.getQuantity());

                    // Extract user_id and add to the response
                    Map<String, Object> orderDetails = new HashMap<>();
                    orderDetails.put("user_id", orderItem.getOrder().getUser().getId());
                    orderDetails.put("total", orderItem.getOrder().getTotal());
                    orderDetails.put("payment", orderItem.getOrder().getPayment());
                    orderDetails.put("id", orderItem.getOrder().getId());
                    orderMap.put("order_details", orderDetails);

                    return orderMap;
                })
                .collect(Collectors.toList());
        System.out.println(response);
        return ResponseEntity.ok(response);
    }


}