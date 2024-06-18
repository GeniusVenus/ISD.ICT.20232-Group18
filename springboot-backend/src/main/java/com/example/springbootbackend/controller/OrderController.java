package com.example.springbootbackend.controller;
import com.example.springbootbackend.DTO.OrderDetailDTO;
import com.example.springbootbackend.DTO.*;
import com.example.springbootbackend.utils.DTOConverter;
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
        List<OrderItem> orderItems = orderService.getOrderItemsByOrderId(order_id);
//        PaymentDetail paymentDetail = orderService.getPaymentDetail(order_id);

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
            response.put("payment",orderDetail.getPayment());
            response.put("order_items", matchingOrderItems);
            response.put("createdAt",orderDetail.getCreatedAt());
            response.put("updateAt",orderDetail.getUpdatedAt());


            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> getAllOrderDetailsByUserId(@PathVariable("user_id") int userId) {
        List<OrderDetail> orderDetails = orderService.getAllOrderDetailsByUserId(userId);
        List<Map<String, Object>> response = orderDetails.stream()
                .map(orderDetail -> {
                    Map<String, Object> orderMap = new HashMap<>();
                    orderMap.put("id", orderDetail.getId());
                    orderMap.put("user_id", orderDetail.getUser().getId());
                    orderMap.put("total",orderDetail.getTotal());
                    orderMap.put("createAt",orderDetail.getCreatedAt());
                    orderMap.put("updateAt",orderDetail.getUpdatedAt());
                    orderMap.put("payment",orderDetail.getPayment());
                    return orderMap;
                })
                .collect(Collectors.toList());
        System.out.println(response);
        return ResponseEntity.ok(response);
    }


    //    CRUD Order Detail
    @PostMapping
    public ResponseEntity<OrderDetailDTO> createOrderDetail(@RequestBody OrderDetail orderDetail) {
        OrderDetail createdOrderDetail = orderService.createOrderDetail(orderDetail);
        OrderDetailDTO dto = DTOConverter.convertToOrderDetailDTO(createdOrderDetail);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PutMapping("/{order_id}")
    public ResponseEntity<OrderDetailDTO> updateOrderDetail(@PathVariable("order_id") int orderId, @RequestBody OrderDetail orderDetail) {
        Optional<OrderDetail> updatedOrderDetail = Optional.ofNullable(orderService.updateOrderDetail(orderId, orderDetail));
        return updatedOrderDetail.map(detail -> ResponseEntity.ok(DTOConverter.convertToOrderDetailDTO(detail)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{order_id}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable("order_id") int orderId) {
        boolean isDeleted = orderService.deleteOrderDetail(orderId);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
//    CRUD OrderItem


    @PutMapping("/items/{item_id}")
    public ResponseEntity<OrderItem> updateOrderItem(@PathVariable Integer itemId, @RequestBody OrderItem orderItem) {
        Optional<OrderItem> updatedOrderItem = orderService.updateOrderItem(itemId, orderItem);
        return updatedOrderItem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/items/{item_id}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable Integer itemId) {
        boolean isDeleted = orderService.deleteOrderItem(itemId);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    Update status order
    @PutMapping("/payments/{paymentId}/status")
    public ResponseEntity<PaymentDetailDTO> updatePaymentStatus(
            @PathVariable int paymentId,
            @RequestParam String status) {

        PaymentDetail updatedPaymentDetail = orderService.updatePaymentStatus(paymentId, status);
        PaymentDetailDTO paymentDetailDTO = DTOConverter.convertToPaymentDetailDTO(updatedPaymentDetail);
        return ResponseEntity.ok(paymentDetailDTO);
    }



}