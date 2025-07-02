package com.example.demo.controller;

import com.example.demo.entity.ContactMessage;
import com.example.demo.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin
public class ContactMessageController {
    @Autowired
    private ContactMessageRepository repo;

    @GetMapping
    public List<ContactMessage> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public ContactMessage create(@RequestBody ContactMessage msg) {
        return repo.save(msg);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> getById(@PathVariable Long id) {
        return repo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactMessage> update(@PathVariable Long id, @RequestBody ContactMessage msg) {
        return repo.findById(id)
            .map(existing -> {
                existing.setName(msg.getName());
                existing.setEmail(msg.getEmail());
                existing.setSubject(msg.getSubject());
                existing.setMessage(msg.getMessage());
                return ResponseEntity.ok(repo.save(existing));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return repo.findById(id)
            .map(existing -> {
                repo.deleteById(id);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
} 