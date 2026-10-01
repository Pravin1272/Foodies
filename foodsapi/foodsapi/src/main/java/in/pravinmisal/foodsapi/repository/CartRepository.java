package in.pravinmisal.foodsapi.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import in.pravinmisal.foodsapi.model.Cart;

public interface CartRepository extends MongoRepository<Cart, String> {

    Optional<Cart> findByUserEmail(String userEmail);
}