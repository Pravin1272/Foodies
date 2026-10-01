import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFoodDetails } from "../../service/foodService";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/logo.png";

const FoodDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

    const { addToCart } = useCart();

    useEffect(() => {
        const loadFoodDetails = async () => {
            try {
                const food = await fetchFoodDetails(id);
                setData(food);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        loadFoodDetails();
    }, [id]);

    const handleAddToCart = () => {
        if (data && (data.id || data._id)) {
            addToCart(data);
        }
    };

    return (
        <>
            {/* NAVIGATION BAR ONLY */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/">
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
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/explore">
                                    Explore
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">
                                    Contact us
                                </Link>
                            </li>

                        </ul>

                        <div className="d-flex align-items-center gap-3">

                            <Link
                                to="/cart"
                                className="btn btn-outline-warning rounded-circle"
                            >
                                <i className="bi bi-cart3"></i>
                            </Link>

                            <button className="btn btn-outline-primary">
                                Login
                            </button>

                            <button className="btn btn-outline-success">
                                Register
                            </button>

                        </div>
                    </div>
                </div>
            </nav>

            {/* FOOD DETAILS */}
            <section className="py-5">

                <div className="container px-4 px-lg-5 my-5">

                    <div className="row gx-5 align-items-center">

                        <div className="col-md-6 mb-4 mb-md-0">

                            <img
                                src={data.imageUrl}
                                alt={data.foodName || "Food"}
                                className="img-fluid rounded"
                                style={{
                                    width: "100%",
                                    height: "500px",
                                    objectFit: "cover"
                                }}
                            />

                        </div>

                        <div className="col-md-6">

                            <div className="small mb-2">
                                Category:{" "}
                                <span className="badge bg-warning text-dark">
                                    {data.category}
                                </span>
                            </div>

                            <h1 className="display-5 fw-bold">
                                {data.foodName}
                            </h1>

                            <div className="fs-4 mb-4">
                                ₹{data.price}
                            </div>

                            <p className="lead mb-4">
                                {data.description}
                            </p>

                            <button
                                className="btn btn-dark"
                                type="button"
                                onClick={handleAddToCart}
                            >
                                <i className="bi bi-cart-fill me-2"></i>
                                Add to cart
                            </button>

                        </div>

                    </div>

                </div>

            </section>
        </>
    );
};

export default FoodDetails;