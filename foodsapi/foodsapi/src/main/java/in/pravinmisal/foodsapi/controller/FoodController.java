package in.pravinmisal.foodsapi.controller;

import in.pravinmisal.foodsapi.model.Food;
import in.pravinmisal.foodsapi.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/food")
@RequiredArgsConstructor
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175"
        }
)
public class FoodController {

    private final FoodService foodService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadImage(@RequestParam("file") MultipartFile file) {

        return foodService.uploadFile(file);

    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Food addFood(
            @RequestParam("foodName") String foodName,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam("file") MultipartFile file
    ) {

        Food food = new Food();

        food.setFoodName(foodName.trim());
        food.setDescription(description.trim());
        food.setPrice(price);
        food.setCategory(category.trim());

        return foodService.addFood(food, file);

    }

    @GetMapping("/all")
    public List<Food> getAllFoods() {

        return foodService.getAllFoods();

    }

    @GetMapping("/{id}")
    public Food getFoodById(@PathVariable String id) {

        return foodService.getFoodById(id);

    }

    @GetMapping("/category/{category}")
    public List<Food> getFoodByCategory(@PathVariable String category) {

        return foodService.getFoodByCategory(category);

    }

    @GetMapping("/name/{foodName}")
    public List<Food> getFoodByName(@PathVariable String foodName) {

        return foodService.getFoodByName(foodName);

    }

    @GetMapping("/search/{keyword}")
    public List<Food> searchFood(@PathVariable String keyword) {

        return foodService.searchFood(keyword);

    }

    @DeleteMapping("/delete/{id}")
    public String deleteFood(@PathVariable String id) {

        foodService.deleteFood(id);

        return "Food Deleted Successfully";

    }

    @PutMapping(
            value = "/update/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Food updateFood(
            @PathVariable String id,
            @RequestParam("foodName") String foodName,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {

        return foodService.updateFood(
                id,
                foodName,
                description,
                price,
                category,
                file
        );

    }

    @GetMapping("/page")
    public Page<Food> getFoodsWithPagination(
            @RequestParam int page,
            @RequestParam int size
    ) {

        return foodService.getFoodsWithPagination(page, size);

    }

    @GetMapping("/sort/{field}")
    public List<Food> getFoodsWithSorting(@PathVariable String field) {

        return foodService.getFoodsWithSorting(field);

    }

    @GetMapping("/pageSort")
    public Page<Food> getFoodsWithPaginationAndSorting(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String field
    ) {

        return foodService.getFoodsWithPaginationAndSorting(
                page,
                size,
                field
        );

    }
}