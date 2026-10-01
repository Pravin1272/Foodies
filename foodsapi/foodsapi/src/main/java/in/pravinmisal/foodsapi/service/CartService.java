package in.pravinmisal.foodsapi.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Service;

import in.pravinmisal.foodsapi.model.Cart;
import in.pravinmisal.foodsapi.model.Food;
import in.pravinmisal.foodsapi.repository.CartRepository;
import in.pravinmisal.foodsapi.repository.FoodRepository;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final FoodRepository foodRepository;

    public CartService(
            CartRepository cartRepository,
            FoodRepository foodRepository) {

        this.cartRepository = cartRepository;
        this.foodRepository = foodRepository;
    }

    public Cart getCart(String userEmail) {

        return cartRepository
                .findByUserEmail(userEmail)
                .orElseGet(() -> {

                    Cart cart = new Cart();

                    cart.setUserEmail(userEmail);
                    cart.setItems(new ArrayList<>());

                    return cartRepository.save(cart);
                });
    }

    public Cart addToCart(
            String userEmail,
            String foodId) {

        Food food = foodRepository
                .findById(foodId)
                .orElseThrow(() ->
                        new RuntimeException("Food not found")
                );

        Cart cart = getCart(userEmail);

        List<Cart.CartItem> items = cart.getItems();

        if (items == null) {
            items = new ArrayList<>();
            cart.setItems(items);
        }

        Cart.CartItem existingItem = items
                .stream()
                .filter(item ->
                        item.getFoodId().equals(foodId))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {

            existingItem.setQuantity(
                    existingItem.getQuantity() + 1
            );

        } else {

            Cart.CartItem newItem =
                    new Cart.CartItem();

            newItem.setFoodId(food.getId());
            newItem.setFoodName(food.getFoodName());
            newItem.setImageUrl(food.getImageUrl());
            newItem.setDescription(food.getDescription());
            newItem.setPrice(food.getPrice());
            newItem.setCategory(food.getCategory());
            newItem.setQuantity(1);

            items.add(newItem);
        }

        return cartRepository.save(cart);
    }

    public Cart increaseQuantity(
            String userEmail,
            String foodId) {

        Cart cart = getCart(userEmail);

        Cart.CartItem item = cart.getItems()
                .stream()
                .filter(cartItem ->
                        cartItem.getFoodId().equals(foodId))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Food not found in cart")
                );

        item.setQuantity(
                item.getQuantity() + 1
        );

        return cartRepository.save(cart);
    }

    public Cart decreaseQuantity(
            String userEmail,
            String foodId) {

        Cart cart = getCart(userEmail);

        Iterator<Cart.CartItem> iterator =
                cart.getItems().iterator();

        while (iterator.hasNext()) {

            Cart.CartItem item = iterator.next();

            if (item.getFoodId().equals(foodId)) {

                int newQuantity =
                        item.getQuantity() - 1;

                if (newQuantity <= 0) {
                    iterator.remove();
                } else {
                    item.setQuantity(newQuantity);
                }

                break;
            }
        }

        return cartRepository.save(cart);
    }

    public Cart removeFromCart(
            String userEmail,
            String foodId) {

        Cart cart = getCart(userEmail);

        cart.getItems().removeIf(
                item -> item.getFoodId().equals(foodId)
        );

        return cartRepository.save(cart);
    }

    public Cart clearCart(String userEmail) {

        Cart cart = getCart(userEmail);

        cart.setItems(new ArrayList<>());

        return cartRepository.save(cart);
    }
}