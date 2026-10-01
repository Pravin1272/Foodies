package in.pravinmisal.foodsapi.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "carts")
public class Cart {

    @Id
    private String id;

    private String userEmail;

    private List<CartItem> items = new ArrayList<>();

    public Cart() {
    }

    public Cart(String userEmail, List<CartItem> items) {
        this.userEmail = userEmail;
        this.items = items;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public static class CartItem {

        private String foodId;
        private String foodName;
        private String imageUrl;
        private String description;
        private Double price;
        private String category;
        private int quantity;

        public CartItem() {
        }

        public CartItem(
                String foodId,
                String foodName,
                String imageUrl,
                String description,
                Double price,
                String category,
                int quantity) {

            this.foodId = foodId;
            this.foodName = foodName;
            this.imageUrl = imageUrl;
            this.description = description;
            this.price = price;
            this.category = category;
            this.quantity = quantity;
        }

        public String getFoodId() {
            return foodId;
        }

        public void setFoodId(String foodId) {
            this.foodId = foodId;
        }

        public String getFoodName() {
            return foodName;
        }

        public void setFoodName(String foodName) {
            this.foodName = foodName;
        }

        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}