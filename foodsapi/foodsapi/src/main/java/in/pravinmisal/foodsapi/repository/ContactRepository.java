package in.pravinmisal.foodsapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import in.pravinmisal.foodsapi.model.ContactMessage;

public interface ContactRepository extends MongoRepository<ContactMessage, String> {

}