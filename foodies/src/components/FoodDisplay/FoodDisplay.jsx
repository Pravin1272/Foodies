import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const FoodDisplay = ({
    category = "All",
    searchTerm = ""
}) => {

    const { foodList } = useContext(StoreContext);

    const { addToCart } = useCart();

    const navigate = useNavigate();

    const filteredFoodList = foodList.filter((food) => {

        const matchesCategory =
            category === "All" ||
            (
                food.category &&
                food.category.toLowerCase() ===
                category.toLowerCase()
            );

        const matchesSearch =
            searchTerm.trim() === "" ||
            (
                food.foodName &&
                food.foodName
                    .toLowerCase()
                    .includes(
                        searchTerm.trim().toLowerCase()
                    )
            );

        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (food) => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        addToCart(food);
    };

    return (
        <div className="container">

            {searchTerm && (
                <div className="mb-4">

                    <h4>
                        Search results for "{searchTerm}"
                    </h4>

                    <p className="text-muted">
                        {filteredFoodList.length} food item(s) found
                    </p>

                </div>
            )}

            <div className="row">

                {filteredFoodList.length > 0 ? (

                    filteredFoodList.map((food, index) => (

                        <div
                            key={food.id || food._id || index}
                            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
                        >

                            <div
                                className="card"
                                style={{
                                    width: "100%",
                                    maxWidth: "320px"
                                }}
                            >

                                <img
                                    src={food.imageUrl}
                                    className="card-img-top"
                                    alt={food.foodName}
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="card-body">

                                    <h5 className="card-title">
                                        {food.foodName}
                                    </h5>

                                    <p className="card-text">
                                        {food.description}
                                    </p>

                                    <div className="d-flex justify-content-between align-items-center">

                                        <span className="h5 mb-0">
                                            ₹{food.price}
                                        </span>

                                        <span className="badge bg-warning text-dark">
                                            {food.category}
                                        </span>

                                    </div>

                                </div>

                                <div className="card-footer d-flex justify-content-between bg-light">

                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() =>
                                            handleAddToCart(food)
                                        }
                                    >
                                        <i className="bi bi-cart-plus me-1"></i>
                                        Add to Cart
                                    </button>

                                    <Link
                                        className="btn btn-outline-secondary btn-sm"
                                        to={`/food/${food.id || food._id}`}
                                    >
                                        View Food
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="text-center mt-4">

                        <h4>
                            No food found.
                        </h4>

                        <p className="text-muted">
                            Try searching for another food item.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
};

export default FoodDisplay;