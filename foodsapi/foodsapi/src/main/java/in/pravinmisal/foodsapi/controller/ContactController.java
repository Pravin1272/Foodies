package in.pravinmisal.foodsapi.controller;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.pravinmisal.foodsapi.model.ContactMessage;
import in.pravinmisal.foodsapi.repository.ContactRepository;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping("/save")
    public ResponseEntity<ContactMessage> saveContact(
            @RequestBody ContactMessage contactMessage) {

        contactMessage.setCreatedAt(LocalDateTime.now());

        ContactMessage savedMessage =
                contactRepository.save(contactMessage);

        return ResponseEntity.ok(savedMessage);
    }
}