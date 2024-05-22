package com.example.springbootbackend.model;

import jakarta.persistence.*;
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="username")
    private String name;
    @Column(name="password")
    private String password;
    public int getId() {return this.id;}
    public void setId(int id) { this.id = id; }
    public String getName() { return this.name; }
    public void setName(String name) { this.name = name; }
    public String getPassword(){return this.password;}
    public void setPassword(String password){ this.password = password; }
    public User() {}

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }}
