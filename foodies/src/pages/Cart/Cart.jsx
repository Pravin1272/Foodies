import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/logo.png";

const Cart = () => {

    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartTotal
    } = useCart();

    const navigate = useNavigate();

    const handleCheckout = () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            navigate("/login");

            return;
        }

        if (cartItems.length === 0) {

            return;
        }

        navigate("/checkout");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">

                <div className="container-fluid">

                    <Link
                        className="navbar-brand"
                        to="/"
                    >
                        <img
                            src={logo}
                            alt="Foodies"
                            width="45"
                            height="45"
                        />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarContent"
                    >

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/"
                                >
                                    Home
                                </Link>

                            </li>

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/explore"
                                >
                                    Explore
                                </Link>

                            </li>

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/contact"
                                >
                                    Contact us
                                </Link>

                            </li>

                        </ul>

                        <div className="d-flex align-items-center gap-3">

                            <Link
                                to="/cart"
                                className="btn btn-outline-warning rounded-circle position-relative"
                            >

                                <i className="bi bi-cart3"></i>

                                {cartItems.length > 0 && (

                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">

                                        {cartItems.reduce(
                                            (total, item) =>
                                                total +
                                                item.quantity,
                                            0
                                        )}

                                    </span>

                                )}

                            </Link>

                            <Link
                                to="/login"
                                className="btn btn-outline-primary"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-outline-success"
                            >
                                Register
                            </Link>

                        </div>

                    </div>

                </div>

            </nav>

            <div className="container py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>
                        Your Cart
                    </h2>

                    <Link
                        to="/explore"
                        className="btn btn-outline-primary"
                    >
                        Continue Shopping
                    </Link>

                </div>

                {cartItems.length === 0 ? (

                    <div className="text-center py-5">

                        <i
                            className="bi bi-cart-x"
                            style={{
                                fontSize: "60px"
                            }}
                        ></i>

                        <h4 className="mt-3">
                            Your cart is empty
                        </h4>

                        <Link
                            to="/explore"
                            className="btn btn-primary mt-3"
                        >
                            Explore Food
                        </Link>

                    </div>

                ) : (

                    <>

                        {cartItems.map((item) => {

                            const foodId =
                                item.foodId ||
                                item.id ||
                                item._id;

                            const itemTotal =
                                Number(item.price || 0) *
                                item.quantity;

                            return (

                                <div
                                    key={foodId}
                                    className="card mb-3"
                                >

                                    <div className="row g-0 align-items-center">

                                        <div className="col-md-2">

                                            <img
                                                src={item.imageUrl}
                                                alt={item.foodName}
                                                className="img-fluid rounded-start"
                                                style={{
                                                    width: "100%",
                                                    height: "150px",
                                                    objectFit: "cover"
                                                }}
                                            />

                                        </div>

                                        <div className="col-md-7">

                                            <div className="card-body">

                                                <h4 className="card-title">
                                                    {item.foodName}
                                                </h4>

                                                <p className="mb-2">
                                                    {item.description}
                                                </p>

                                                <h5>
                                                    ₹{item.price}
                                                </h5>

                                                <div className="d-flex align-items-center mt-3">

                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                foodId
                                                            )
                                                        }
                                                    >
                                                        −
                                                    </button>

                                                    <span
                                                        className="mx-3 fw-bold"
                                                        style={{
                                                            minWidth: "20px",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() =>
                                                            increaseQuantity(
                                                                foodId
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-3 text-center">

                                            <h5>
                                                ₹{itemTotal}
                                            </h5>

                                            <button
                                                className="btn btn-outline-danger mt-3"
                                                onClick={() =>
                                                    removeFromCart(
                                                        foodId
                                                    )
                                                }
                                            >

                                                <i className="bi bi-trash"></i>

                                                {" "}

                                                Remove

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                        <div className="card mt-4">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <h4 className="mb-0">
                                        Total
                                    </h4>

                                    <h3 className="mb-0">
                                        ₹{cartTotal}
                                    </h3>

                                </div>

                                <button
                                    className="btn btn-primary w-100 mt-3"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>

                            </div>

                        </div>

                    </>

                )}

            </div>
        </>
    );
};

export default Cart;