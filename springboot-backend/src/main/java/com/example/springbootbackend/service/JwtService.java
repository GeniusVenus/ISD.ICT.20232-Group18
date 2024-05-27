package com.example.springbootbackend.service;

import com.example.springbootbackend.utils.JwtAuthFilter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtService {
    private static final String JWT_SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
    private static final Long JWT_EXPIRATION = 1000L * 60 * 60 * 24;
    private final Set<String> tokenBlackList = new HashSet<>();
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);


    // generate token for user
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    // create token with provided claims and subject(username)
    public String createToken(Map<String, Object> claims, String username) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();
    }

    public void invalidateToken(String token) {
        // implement token invalidation
        tokenBlackList.add(token);
        logger.info("Token invalidated: {}", token);
        logger.info("Token blacklist: {}", tokenBlackList);
    }

    // get the signing key from the secret key
    public Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(JWT_SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // extract expiration date from token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // extract the username from the token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // extract a specific claim from token using provided claimsResolver
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // extract all claims from token
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // check if the token is expired
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // validate the token against the user details
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token) && !tokenBlackList.contains(token));
    }
}
