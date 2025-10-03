package com.demo.catalogservice.model;


import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository repo;
    private final RestTemplate restTemplate = new RestTemplate();

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> getAll() {
        return repo.findAll();
    }

    @PostMapping("/add")
    public Product add(@RequestBody Product product,
                       @RequestHeader("Authorization") String token) {
        // Chama Auth Service para validar (simplificado)
        Map response = restTemplate.postForObject(
                "http://localhost:8081/auth/login",
                Map.of("username", "admin", "password", "123"),
                Map.class);

        if (response.containsKey("token")) {
            return repo.save(product);
        } else {
            throw new RuntimeException("Token inválido");
        }
    }
}
