package com.example.springbootbackend.service.impl;

import com.example.springbootbackend.model.OrderItem;
import com.example.springbootbackend.model.OrderDetail;
import org.springframework.transaction.annotation.Transactional;
import com.example.springbootbackend.model.PaymentDetail;
import com.example.springbootbackend.repository.OrderItemRepository;
import com.example.springbootbackend.repository.OrderDetailRepository;
import com.example.springbootbackend.repository.PaymentDetailRepository;
import com.example.springbootbackend.service.OrderService;
import com.example.springbootbackend.service.UserInfoDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderItemRepository orderItemRepository;
    private final OrderDetailRepository orderDetailRepository;

    private final PaymentDetailRepository paymentDetailRepository;



    @Autowired
    public OrderServiceImpl(OrderItemRepository orderItemRepository, OrderDetailRepository orderDetailRepository, PaymentDetailRepository paymentDetailRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.paymentDetailRepository = paymentDetailRepository;
    }


    @Override
    public List<OrderItem> getOrderItemsByCurrentUser() {
        UserInfoDetails currentUserDetails = (UserInfoDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Long> orderIds = Collections.singletonList(Long.valueOf(currentUserDetails.getUser().getId()));
        return orderItemRepository.findByOrderIdIn(orderIds);

    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(int order_id) {

        return orderItemRepository.findByOrderId(order_id);
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
    public List<OrderDetail> getAllOrderDetailsByUserId(int use_id) {
        return orderDetailRepository.findByUserId(use_id);
    }

    @Override
    public PaymentDetail getPaymentDetail(int payment_id){
        return paymentDetailRepository.findById(payment_id);
    }

    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
        Instant now = Instant.now();

        // Set timestamps for OrderDetail
        orderDetail.setCreatedAt(now);
        orderDetail.setUpdatedAt(now);

        // Get and set timestamps for PaymentDetail
        PaymentDetail paymentDetail = orderDetail.getPayment();
        paymentDetail.setCreatedAt(now);
        paymentDetail.setUpdatedAt(now);
        paymentDetail = paymentDetailRepository.save(paymentDetail); // Save PaymentDetail first
        orderDetail.setPayment(paymentDetail);

        // Set the order for each OrderItem and set timestamps
        List<OrderItem> orderItems = orderDetail.getOrderItems();
        for (OrderItem item : orderItems) {
            item.setOrder(orderDetail);
            item.setCreatedAt(now);
            item.setUpdatedAt(now);
        }

        // Save OrderDetail (cascading will save OrderItems)
        return orderDetailRepository.save(orderDetail);
    }

//    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
//        orderDetail.setCreatedAt(Instant.now());
//        orderDetail.setUpdatedAt(Instant.now());
//
//        PaymentDetail paymentDetail = orderDetail.getPayment();
//        paymentDetail.setCreatedAt(Instant.now());
//        paymentDetail.setUpdatedAt(Instant.now());
//        orderDetail.setPayment(paymentDetail);
//
//        // Set the order for each OrderItem and set timestamps
//        List<OrderItem> orderItems = orderDetail.getOrderItems();
//        for (OrderItem item : orderItems) {
//            item.setOrder(orderDetail);
//            item.setCreatedAt(Instant.now());
//            item.setUpdatedAt(Instant.now());
//        }
//
//        return orderDetailRepository.save(orderDetail);
//    }



    public OrderDetail updateOrderDetail(int orderId, OrderDetail orderDetail) {
        if (orderDetailRepository.existsById(orderId)) {
            orderDetail.setId(orderId);
            return orderDetailRepository.save(orderDetail);
        }
        return null;
    }

    public boolean deleteOrderDetail(int orderId) {
        if (orderDetailRepository.existsById(orderId)) {
            orderDetailRepository.deleteById(orderId);
            return true;
        }
        return false;
    }


    public Optional<OrderItem> getOrderItemById(Integer id) {
        return orderItemRepository.findById((long) id);
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public Optional<OrderItem> updateOrderItem(Integer id, OrderItem orderItem) {
        return orderItemRepository.findById(Long.valueOf(id)).map(existingOrderItem -> {
            existingOrderItem.setOrder(orderItem.getOrder());
            existingOrderItem.setProduct(orderItem.getProduct());
            existingOrderItem.setQuantity(orderItem.getQuantity());
            existingOrderItem.setCreatedAt(orderItem.getCreatedAt());
            existingOrderItem.setUpdatedAt(orderItem.getUpdatedAt());
            return orderItemRepository.save(existingOrderItem);
        });
    }

    public boolean deleteOrderItem(Integer id) {
        return orderItemRepository.findById(Long.valueOf(id)).map(orderItem -> {
            orderItemRepository.delete(orderItem);
            return true;
        }).orElse(false);
    }

//    Update status
    @Transactional
    public PaymentDetail updatePaymentStatus(int paymentId, String status) {
        Optional<PaymentDetail> optionalPaymentDetail = Optional.ofNullable(paymentDetailRepository.findById(paymentId));
        if (optionalPaymentDetail.isPresent()) {
            PaymentDetail paymentDetail = optionalPaymentDetail.get();
            paymentDetail.setStatus(status);
            return paymentDetailRepository.save(paymentDetail);
        } else {
            throw new RuntimeException("PaymentDetail not found with id " + paymentId);
        }
    }

}