package com.example.springbootbackend.service;

import com.example.springbootbackend.model.ShoppingSession;
import com.example.springbootbackend.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;

    public void saveSession(ShoppingSession session) {
        sessionRepository.save(session);
    }

    public ShoppingSession findLatestSessionByUserId(Integer userId) {
        return sessionRepository.findLatestSessionByUserId(userId);
    }

    public void deleteSession(Integer sessionId) {
        sessionRepository.deleteById(sessionId);
    }
}
