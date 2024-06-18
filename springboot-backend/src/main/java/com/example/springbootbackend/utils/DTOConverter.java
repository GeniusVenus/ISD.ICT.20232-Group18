package com.example.springbootbackend.utils;

import com.example.springbootbackend.DTO.*;
import com.example.springbootbackend.model.OrderDetail;
import com.example.springbootbackend.model.OrderItem;
import com.example.springbootbackend.model.PaymentDetail;

import java.util.List;
import java.util.stream.Collectors;

public class DTOConverter {

    public static OrderDetailDTO convertToOrderDetailDTO(OrderDetail orderDetail) {
        OrderDetailDTO dto = new OrderDetailDTO();
        dto.setId(orderDetail.getId());
        dto.setUserId(orderDetail.getUser().getId());
        dto.setTotal(orderDetail.getTotal());
        dto.setCreatedAt(orderDetail.getCreatedAt());
        dto.setUpdatedAt(orderDetail.getUpdatedAt());

        // Set new fields
        dto.setCustomerName(orderDetail.getCustomerName());
        dto.setPhoneNumber(orderDetail.getPhoneNumber());
        dto.setCity(orderDetail.getCity());
        dto.setAddress(orderDetail.getAddress());

        // Convert and set OrderItems
        if (orderDetail.getOrderItems() != null && !orderDetail.getOrderItems().isEmpty()) {
            List<OrderItemDTO> orderItemDTOs = orderDetail.getOrderItems().stream()
                    .map(DTOConverter::convertToOrderItemDTO)
                    .collect(Collectors.toList());
            dto.setOrderItems(orderItemDTOs);
        }

        // Convert and set PaymentDetail
        if (orderDetail.getPayment() != null) {
            PaymentDetailDTO paymentDTO = convertToPaymentDetailDTO(orderDetail.getPayment());
            dto.setPayment(paymentDTO);
        }

        return dto;
    }

    public static OrderItemDTO convertToOrderItemDTO(OrderItem orderItem) {
        OrderItemDTO dto = new OrderItemDTO();
        dto.setId(orderItem.getId());
        dto.setProductId(orderItem.getProduct().getId());
        dto.setQuantity(orderItem.getQuantity());
        dto.setCreatedAt(orderItem.getCreatedAt());
        dto.setUpdatedAt(orderItem.getUpdatedAt());
        return dto;
    }

    public static PaymentDetailDTO convertToPaymentDetailDTO(PaymentDetail paymentDetail) {
        PaymentDetailDTO dto = new PaymentDetailDTO();
        dto.setId(paymentDetail.getId());
        dto.setAmount(paymentDetail.getAmount());
        dto.setProvider(paymentDetail.getProvider());
        dto.setStatus(paymentDetail.getStatus());
        dto.setCreatedAt(paymentDetail.getCreatedAt());
        dto.setUpdatedAt(paymentDetail.getUpdatedAt());
        return dto;
    }
}
