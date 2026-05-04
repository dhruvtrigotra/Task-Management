package com.example.TaskManager.controller;

import com.example.TaskManager.dto.AuthResponse;
import com.example.TaskManager.entity.User;
import com.example.TaskManager.security.JwtUtil;
import com.example.TaskManager.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody User user) {

        User savedUser = authService.signup(user);

        String token = jwtUtil.generateToken(savedUser.getEmail());

        return new AuthResponse(
                "Signup successful",
                token,
                sanitize(savedUser)
        );
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody User user) {

        User loggedInUser = authService.login(user.getEmail(), user.getPassword());

        String token = jwtUtil.generateToken(loggedInUser.getEmail());  // 🔥 generate

        return new AuthResponse(
                "Login successful",
                token,
                sanitize(loggedInUser)
        );
    }

    // Remove password before sending response
    private User sanitize(User user) {
        user.setPassword(null);
        return user;
    }
}