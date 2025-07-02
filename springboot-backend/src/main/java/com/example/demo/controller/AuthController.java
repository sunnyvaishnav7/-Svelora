package com.example.demo.controller;

import com.example.demo.security.JwtUtil;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> req) {
        userService.register(req.get("username"), req.get("password"));
        return Map.of("message", "User registered successfully");
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> req) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.get("username"), req.get("password"))
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(req.get("username"));
        String token = jwtUtil.generateToken(userDetails.getUsername());
        return Map.of("token", token);
    }
} 