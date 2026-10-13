import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import axios from "axios";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const fetchCart = async () => {

        const token = getToken();

        if (!token) {
            setCartItems([]);
            return;
        }

        try {

            const response = await axios.get(
                "https://foodies-backend-1h8u.onrender.com/cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCartItems(response.data.items || []);

        } catch (error) {

            console.error(
                "Error fetching cart:",
                error
            );

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userEmail");
                setCartItems([]);
            }
        }
    };

    useEffect(() => {

        fetchCart();

    }, []);

    const addToCart = async (food) => {

        const token = getToken();

        if (!token) {
            return false;
        }

        const foodId = food.id || food._id;

        try {

            const response = await axios.post(
                `https://foodies-backend-1h8u.onrender.com/cart/add/${foodId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCartItems(
                response.data.items || []
            );

            return true;

        } catch (error) {

            console.error(
                "Error adding food to cart:",
                error
            );

            return false;
        }
    };

    const increaseQuantity = async (foodId) => {

        const token = getToken();

        if (!token) {
            return;
        }

        try {

            const response = await axios.put(
                `https://foodies-backend-1h8u.onrender.com/cart/increase/${foodId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCartItems(
                response.data.items || []
            );

        } catch (error) {

            console.error(
                "Error increasing quantity:",
                error
            );
        }
    };

    const decreaseQuantity = async (foodId) => {

        const token = getToken();

        if (!token) {
            return;
        }

        try {

            const response = await axios.put(
                `https://foodies-backend-1h8u.onrender.com/cart/decrease/${foodId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCartItems(
                response.data.items || []
            );

        } catch (error) {

            console.error(
                "Error decreasing quantity:",
                error
            );
        }
    };

    const removeFromCart = async (foodId) => {

        const token = getToken();

        if (!token) {
            return;
        }

        try {

            const response = await axios.delete(
                `https://foodies-backend-1h8u.onrender.com/cart/remove/${foodId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCartItems(
                response.data.items || []
            );

        } catch (error) {

            console.error(
                "Error removing food from cart:",
                error
            );
        }
    };

    const clearCart = async () => {

        const token = getToken();

        if (!token) {
            setCartItems([]);
            return;
        }

        try {

            const response = await axios.delete(
                "https://foodies-backend-1h8u.onrender.com/cart/clear",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCartItems(
                response.data.items || []
            );

        } catch (error) {

            console.error(
                "Error clearing cart:",
                error
            );
        }
    };

    const clearLocalCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    const cartTotal = cartItems.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
            item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                clearLocalCart,
                cartCount,
                cartTotal,
                fetchCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
};