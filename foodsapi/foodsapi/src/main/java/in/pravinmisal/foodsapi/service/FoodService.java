package in.pravinmisal.foodsapi.service;

import in.pravinmisal.foodsapi.model.Food;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;

import java.util.List;

import org.springframework.data.domain.Sort;

public interface FoodService {

    String uploadFile(MultipartFile file);

    Food addFood(Food food, MultipartFile file);

    List<Food> getAllFoods();

    Food getFoodById(String id);

    Food updateFood(String id,
                    String foodName,
                    String description,
                    Double price,
                    String category,
                    MultipartFile file);

    void deleteFood(String id);

    List<Food> getFoodByCategory(String category);

    List<Food> getFoodByName(String foodName);

    List<Food> searchFood(String keyword);

    Page<Food> getFoodsWithPagination(int page, int size);

    List<Food> getFoodsWithSorting(String field);

    Page<Food> getFoodsWithPaginationAndSorting(int page, int size, String field);





}