package in.pravinmisal.foodsapi.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import in.pravinmisal.foodsapi.model.Cart;
import in.pravinmisal.foodsapi.model.Order;
import in.pravinmisal.foodsapi.repository.CartRepository;
import in.pravinmisal.foodsapi.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    public OrderService(
            OrderRepository orderRepository,
            CartRepository cartRepository) {

        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    public Order createOrder(
            String userEmail,
            String address,
            String city,
            String pincode,
            String phone,
            String paymentMethod) {

        Cart cart = cartRepository
                .findByUserEmail(userEmail)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        if (cart.getItems() == null ||
                cart.getItems().isEmpty()) {

            throw new RuntimeException("Cart is empty");
        }

        if (address == null || address.trim().isEmpty()) {
            throw new RuntimeException("Address is required");
        }

        if (city == null || city.trim().isEmpty()) {
            throw new RuntimeException("City is required");
        }

        if (pincode == null || pincode.trim().isEmpty()) {
            throw new RuntimeException("Pincode is required");
        }

        if (phone == null || phone.trim().isEmpty()) {
            throw new RuntimeException("Phone number is required");
        }

        Order order = new Order();

        order.setUserEmail(userEmail);

        List<Order.OrderItem> orderItems =
                new ArrayList<>();

        double totalAmount = 0.0;

        for (Cart.CartItem cartItem : cart.getItems()) {

            Order.OrderItem orderItem =
                    new Order.OrderItem();

            orderItem.setFoodId(
                    cartItem.getFoodId()
            );

            orderItem.setFoodName(
                    cartItem.getFoodName()
            );

            orderItem.setImageUrl(
                    cartItem.getImageUrl()
            );

            orderItem.setPrice(
                    cartItem.getPrice()
            );

            orderItem.setQuantity(
                    cartItem.getQuantity()
            );

            orderItems.add(orderItem);

            totalAmount +=
                    cartItem.getPrice() *
                            cartItem.getQuantity();
        }

        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);
        order.setAddress(address.trim());
        order.setCity(city.trim());
        order.setPincode(pincode.trim());
        order.setPhone(phone.trim());

        order.setPaymentMethod(
                paymentMethod == null ||
                        paymentMethod.trim().isEmpty()
                        ? "COD"
                        : paymentMethod.trim()
        );

        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());

        Order savedOrder =
                orderRepository.save(order);

        cart.setItems(new ArrayList<>());

        cartRepository.save(cart);

        return savedOrder;
    }

    public List<Order> getAllOrders() {

        return orderRepository
                .findAllByOrderByCreatedAtDesc();
    }

    public List<Order> getOrdersByUser(
            String userEmail) {

        return orderRepository
                .findByUserEmailOrderByCreatedAtDesc(
                        userEmail
                );
    }

    public Order getOrderById(String id) {

        return orderRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));
    }

    public Order updateOrderStatus(
            String id,
            String status) {

        Order order = getOrderById(id);

        order.setStatus(status);

        return orderRepository.save(order);
    }

    public void deleteOrder(String id) {

        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }

        orderRepository.deleteById(id);
    }
}