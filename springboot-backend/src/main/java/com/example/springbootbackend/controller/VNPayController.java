package com.example.springbootbackend.controller;

import com.example.springbootbackend.DTO.PaymentResDTO;
import com.example.springbootbackend.config.VNPayConfig;
import com.example.springbootbackend.service.impl.VNPayServiceImpl;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;



@RestController
@RequestMapping("/api/payment")
public class VNPayController extends HttpServlet {

    private VNPayServiceImpl VNPayserviceImpl;

    public VNPayController(VNPayServiceImpl vnPayserviceImpl) {
        VNPayserviceImpl = vnPayserviceImpl;
    }

    @PostMapping("")
    public String submidOrder(@RequestParam("amount") int orderTotal,
                              @RequestParam("orderInfo") String orderInfo,
                              HttpServletRequest request){
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = VNPayserviceImpl.createOrder(orderTotal, orderInfo, baseUrl);
        return vnpayUrl;
    }

}
