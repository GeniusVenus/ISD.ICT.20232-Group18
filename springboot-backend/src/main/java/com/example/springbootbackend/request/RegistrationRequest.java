package com.example.springbootbackend.request;

import lombok.Getter;
@Getter
public class RegistrationRequest {
    private String email;
    private String password;
    private String username;
}
