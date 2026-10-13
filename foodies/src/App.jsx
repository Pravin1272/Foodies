
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Contact from "./pages/Contact/Contact";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import MyOrders from "./pages/MyOrders/MyOrders";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
                path="/order-success/:orderId"
                element={<OrderSuccess />}
            />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
    );
}

export default App;