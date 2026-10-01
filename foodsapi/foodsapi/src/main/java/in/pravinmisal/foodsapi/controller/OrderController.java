package in.pravinmisal.foodsapi.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.pravinmisal.foodsapi.model.Order;
import in.pravinmisal.foodsapi.service.JwtService;
import in.pravinmisal.foodsapi.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175"
        }
)
public class OrderController {

    private final OrderService orderService;
    private final JwtService jwtService;

    public OrderController(
            OrderService orderService,
            JwtService jwtService) {

        this.orderService = orderService;
        this.jwtService = jwtService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody CreateOrderRequest request) {

        try {

            String email =
                    getEmailFromToken(
                            authorizationHeader
                    );

            Order order =
                    orderService.createOrder(
                            email,
                            request.getAddress(),
                            request.getCity(),
                            request.getPincode(),
                            request.getPhone(),
                            request.getPaymentMethod()
                    );

            return ResponseEntity.ok(order);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyOrders(
            @RequestHeader("Authorization") String authorizationHeader) {

        try {

            String email =
                    getEmailFromToken(
                            authorizationHeader
                    );

            List<Order> orders =
                    orderService.getOrdersByUser(
                            email
                    );

            return ResponseEntity.ok(orders);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(401)
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllOrders() {

        try {

            return ResponseEntity.ok(
                    orderService.getAllOrders()
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(
            @PathVariable String id) {

        try {

            return ResponseEntity.ok(
                    orderService.getOrderById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable String id,
            @RequestBody StatusRequest request) {

        try {

            Order order =
                    orderService.updateOrderStatus(
                            id,
                            request.getStatus()
                    );

            return ResponseEntity.ok(order);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(
            @PathVariable String id) {

        try {

            orderService.deleteOrder(id);

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Order deleted successfully"
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }

    private String getEmailFromToken(
            String authorizationHeader) {

        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {

            throw new RuntimeException(
                    "Invalid authorization header"
            );
        }

        String token =
                authorizationHeader.substring(7);

        if (!jwtService.isTokenValid(token)) {

            throw new RuntimeException(
                    "Invalid or expired token"
            );
        }

        return jwtService.extractEmail(token);
    }

    public static class CreateOrderRequest {

        private String address;
        private String city;
        private String pincode;
        private String phone;
        private String paymentMethod;

        public CreateOrderRequest() {
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getPincode() {
            return pincode;
        }

        public void setPincode(String pincode) {
            this.pincode = pincode;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getPaymentMethod() {
            return paymentMethod;
        }

        public void setPaymentMethod(String paymentMethod) {
            this.paymentMethod = paymentMethod;
        }
    }

    public static class StatusRequest {

        private String status;

        public StatusRequest() {
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}