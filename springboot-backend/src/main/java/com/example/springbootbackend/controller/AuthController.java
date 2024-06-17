package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.ShoppingSession;
import com.example.springbootbackend.model.User;
import com.example.springbootbackend.request.LoginRequest;
import com.example.springbootbackend.request.RegistrationRequest;
import com.example.springbootbackend.service.JwtService;
import com.example.springbootbackend.service.SessionService;
import com.example.springbootbackend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Optional;

import static com.example.springbootbackend.utils.EmailValidator.isValidEmail;

@RestController
@RequestMapping("/api")
@Slf4j
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final SessionService sessionService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    public AuthController(UserService userService, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, SessionService sessionService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.sessionService = sessionService;
    }

    private boolean isValid(RegistrationRequest request) {
        return request != null && request.getEmail() != null && request.getPassword() != null && request.getUsername() != null &&
                !request.getEmail().isEmpty() && !request.getPassword().isEmpty() && !request.getUsername().isEmpty();
    }

    private boolean isValidLoginRequest(LoginRequest request) {
        return request != null && request.getEmail() != null && request.getPassword() != null &&
                !request.getEmail().isEmpty() && !request.getPassword().isEmpty();
    }

    private boolean isExistingUsername(String username) {
        return userService.getUserByUsername(username) != null;
    }

    private void setJwtTokenCookie(String jwtToken, HttpServletResponse response) {
        Cookie cookie = new Cookie("jwtToken", jwtToken);
        cookie.setMaxAge(60 * 60 * 24);
        cookie.setDomain("localhost");
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setAttribute("SameSite", "None");
        cookie.setSecure(true); // Enable only if serving over HTTPS
        response.addCookie(cookie);
    }

    private void clearJwtTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwtToken", null);
        cookie.setMaxAge(0);
        cookie.setDomain("localhost");
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setAttribute("SameSite", "None");
        cookie.setSecure(true); // Enable only if serving over HTTPS
        response.addCookie(cookie);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegistrationRequest request, HttpServletResponse response) {
        if (!isValid(request)) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        if (request.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body("Password must be at least 6 characters long");
        }

        if (!isValidEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Invalid email address");
        }

        User existingUser = userService.getUserByEmail(request.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
        }

        if (isExistingUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        clearJwtTokenCookie(response);

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        User user = new User(request.getEmail(), hashedPassword,  request.getUsername());
        userService.saveUser(user);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        if (authentication.isAuthenticated()) {
            String jwtToken = jwtService.generateToken(request.getUsername());
            setJwtTokenCookie(jwtToken, response);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User registration failed");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        if (!isValidLoginRequest(request)) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        if (request.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body("Password must be at least 6 characters long");
        }

        if (!isValidEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Invalid email address");
        }

        User existingUser = userService.getUserByEmail(request.getEmail());
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not exist");
        }

        if (!passwordEncoder.matches(request.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password");
        }

        clearJwtTokenCookie(response);

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(existingUser.getUsername(), request.getPassword()));
        log.info(authentication.getAuthorities().toString());
        if (authentication.isAuthenticated()) {
            String jwtToken = jwtService.generateToken(existingUser.getUsername());
            setJwtTokenCookie(jwtToken, response);
            Optional<ShoppingSession> optionalShoppingSession = Optional.ofNullable(sessionService.findLatestSessionByUserId(existingUser.getId()));
            ShoppingSession session = optionalShoppingSession.orElseGet(() -> {
                ShoppingSession newSession = new ShoppingSession();
                newSession.setUser(existingUser);
                newSession.setTotal(BigDecimal.ZERO);
                sessionService.saveSession(newSession);
                log.info("New session ID: {}", newSession.getId());
                return newSession;
            });
            log.info("Session ID: {}", session.getId());
            return ResponseEntity.ok().body(session.getId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User registration failed");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        String token = null;

        log.info("User logged out successfully");
        // Retrieve JWT token from cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwtToken")) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        // Invalidate the token
        jwtService.invalidateToken(token);

        clearJwtTokenCookie(response);

        return ResponseEntity.ok("User logged out successfully");
    }
}
