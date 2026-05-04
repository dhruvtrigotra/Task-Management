package com.example.TaskManager.controller;

import com.example.TaskManager.entity.Role;
import com.example.TaskManager.entity.User;
import com.example.TaskManager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    public List<User> getMembers() {
        return userRepository.findByRole(Role.MEMBER);
    }
}