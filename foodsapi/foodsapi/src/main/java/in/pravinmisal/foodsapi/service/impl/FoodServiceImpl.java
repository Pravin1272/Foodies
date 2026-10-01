package in.pravinmisal.foodsapi.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.pravinmisal.foodsapi.model.Food;
import in.pravinmisal.foodsapi.repository.FoodRepository;
import in.pravinmisal.foodsapi.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {

    private final Cloudinary cloudinary;
    private final FoodRepository foodRepository;

    @Override
    public String uploadFile(MultipartFile file) {

        try {

            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.emptyMap()
            );

            return uploadResult.get("secure_url").toString();

        } catch (IOException e) {
            throw new RuntimeException("Image upload failed");
        }
    }

    @Override
    public Food addFood(Food food, MultipartFile file) {

        String imageUrl = uploadFile(file);

        food.setImageUrl(imageUrl);

        return foodRepository.save(food);
    }

    @Override
    public List<Food> getAllFoods() {

        List<Food> list = foodRepository.findAll();

        System.out.println("Foods from MongoDB = " + list);

        return list;
    }

    @Override
    public Food getFoodById(String id) {

        return foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

    }

    @Override
    public Food updateFood(String id,
                           String foodName,
                           String description,
                           Double price,
                           String category,
                           MultipartFile file) {

        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        food.setFoodName(foodName);
        food.setDescription(description);
        food.setPrice(price);
        food.setCategory(category);

        if (file != null && !file.isEmpty()) {

            String imageUrl = uploadFile(file);

            food.setImageUrl(imageUrl);
        }

        return foodRepository.save(food);
    }

    @Override
    public void deleteFood(String id) {

        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        foodRepository.delete(food);

    }

    @Override
    public List<Food> getFoodByCategory(String category) {

        return foodRepository.findByCategory(category);

    }

    @Override
    public List<Food> getFoodByName(String foodName) {

        return foodRepository.findByFoodName(foodName);

    }

    @Override
    public List<Food> searchFood(String keyword) {

        return foodRepository
                .findByFoodNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                        keyword,
                        keyword
                );


        }

    @Override
    public Page<Food> getFoodsWithPagination(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return foodRepository.findAll(pageable);
    }

    @Override
    public List<Food> getFoodsWithSorting(String field) {

        return foodRepository.findAll(Sort.by(Sort.Direction.ASC, field));

    }

    @Override
    public Page<Food> getFoodsWithPaginationAndSorting(int page, int size, String field) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.ASC, field)
        );

        return foodRepository.findAll(pageable);

    }
}