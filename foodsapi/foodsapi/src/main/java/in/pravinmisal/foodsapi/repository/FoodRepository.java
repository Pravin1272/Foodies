package in.pravinmisal.foodsapi.repository;

import in.pravinmisal.foodsapi.model.Food;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FoodRepository extends MongoRepository<Food, String> {

    List<Food> findByCategory(String category);

    List<Food> findByFoodName(String foodName);

    List<Food> findByFoodNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            String foodName,
            String category
    );

}