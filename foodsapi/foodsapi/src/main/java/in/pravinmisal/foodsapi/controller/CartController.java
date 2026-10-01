package in.pravinmisal.foodsapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.pravinmisal.foodsapi.model.Cart;
import in.pravinmisal.foodsapi.service.CartService;
import in.pravinmisal.foodsapi.service.JwtService;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;
    private final JwtService jwtService;

    public CartController(
            CartService cartService,
            JwtService jwtService) {

        this.cartService = cartService;
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<?> getCart(
            @RequestHeader("Authorization") String authorizationHeader) {

        try {

            String email = getEmailFromToken(authorizationHeader);

            Cart cart = cartService.getCart(email);

            return ResponseEntity.ok(cart);

        } catch (Exception e) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid or expired token");
        }
    }

    @PostMapping("/add/{foodId}")
    public ResponseEntity<?> addToCart(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable String foodId) {

        try {

            String email = getEmailFromToken(authorizationHeader);

            Cart cart =
                    cartService.addToCart(
                            email,
                            foodId
                    );

            return ResponseEntity.ok(cart);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PutMapping("/increase/{foodId}")
    public ResponseEntity<?> increaseQuantity(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable String foodId) {

        try {

            String email = getEmailFromToken(authorizationHeader);

            Cart cart =
                    cartService.increaseQuantity(
                            email,
                            foodId
                    );

            return ResponseEntity.ok(cart);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PutMapping("/decrease/{foodId}")
    public ResponseEntity<?> decreaseQuantity(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable String foodId) {

        try {

            String email = getEmailFromToken(authorizationHeader);

            Cart cart =
                    cartService.decreaseQuantity(
                            email,
                            foodId
                    );

            return ResponseEntity.ok(cart);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/remove/{foodId}")
    public ResponseEntity<?> removeFromCart(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable String foodId) {

        try {

            String email = getEmailFromToken(authorizationHeader);

            Cart cart =
                    cartService.removeFromCart(
                            email,
                            foodId
                    );

            return ResponseEntity.ok(cart);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(
            @RequestHeader("Authorization") String authorizationHeader) {

        try {

            String email = getEmailFromToken(authorizationHeader);

            Cart cart =
                    cartService.clearCart(email);

            return ResponseEntity.ok(cart);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    private String getEmailFromToken(
            String authorizationHeader) {

        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {

            throw new RuntimeException("Invalid authorization header");
        }

        String token =
                authorizationHeader.substring(7);

        if (!jwtService.isTokenValid(token)) {
            throw new RuntimeException("Invalid or expired token");
        }

        return jwtService.extractEmail(token);
    }
}