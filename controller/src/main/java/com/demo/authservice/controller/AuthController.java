package com.demo.authservice.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class AuthController {

    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String user = body.get("username");
        String pass = body.get("password");

        if ("admin".equals(user) && "123".equals(pass)) {
            return Map.of("token", "fake-jwt-token-admin");
        } else {
            return Map.of("error", "Credenciais inválidas");
        }
    }
}

