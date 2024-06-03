package com.example.springbootbackend.service;

import com.example.springbootbackend.model.User;

import java.util.*;

public interface UserService {
    List<User> getAllUsers();
    User getUserByUsername(String username);
    User getUserByEmail(String email);
    void saveUser(User user);
}
