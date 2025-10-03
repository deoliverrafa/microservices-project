package com.demo.catalogservice.model;


import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class ProductController {

    private final ProductRepository repo;
    private final RestTemplate restTemplate = new RestTemplate();

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    @CrossOrigin(origins = "*")
    public List<Product> getAll() {
        return repo.findAll();
    }

    @PostMapping("/add")
    @CrossOrigin(origins = "*")
    public Product add(@RequestBody Product product,
                       @RequestHeader(value = "Authorization", required = false) String token) {
        // Validação simples do token
        if (token == null || token.isEmpty()) {
            throw new RuntimeException("Token de autorização necessário");
        }
        
        // Verifica se o token é válido (simplificado)
        if (!"fake-jwt-token-admin".equals(token)) {
            throw new RuntimeException("Token inválido");
        }
        
        return repo.save(product);
    }
}
