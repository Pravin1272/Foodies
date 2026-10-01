package in.pravinmisal.foodsapi.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import in.pravinmisal.foodsapi.model.Order;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByUserEmailOrderByCreatedAtDesc(String userEmail);

    List<Order> findAllByOrderByCreatedAtDesc();
}