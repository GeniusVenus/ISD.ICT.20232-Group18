package com.example.springbootbackend.controller;

import com.example.springbootbackend.service.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/session")
@RequiredArgsConstructor
public class SessionController {
    private final SessionService sessionService;

    @PostMapping("/delete/{sessionId}")
    public ResponseEntity<Integer> deleteSession(@PathVariable Integer sessionId) {
        sessionService.deleteSession(sessionId);
        return ResponseEntity.ok(sessionId);
    }
}
