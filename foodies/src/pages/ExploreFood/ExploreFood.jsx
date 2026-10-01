import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useCart } from "../../context/CartContext";

const ExploreFood = () => {

    const { foodList } = useContext(StoreContext);

    const { addToCart } = useCart();


    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");


    const handleSearch = (e) => {
        e.preventDefault();
    };


    const handleAddToCart = (food) => {
        addToCart(food);
    };


    const filteredFoods = (foodList || []).filter((food) => {

        const search = searchText.toLowerCase().trim();


        const matchesSearch =
            food.foodName?.toLowerCase().includes(search) ||
            food.description?.toLowerCase().includes(search) ||
            food.category?.toLowerCase().includes(search);


        const matchesCategory =
            selectedCategory === "All" ||
            food.category?.toLowerCase() ===
            selectedCategory.toLowerCase();


        return matchesSearch && matchesCategory;
    });


    return (
        <>

            {/* Navigation Bar */}
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
                                    className="nav-link active"
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


            {/* Search Section */}
            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-md-8">

                        <form onSubmit={handleSearch}>

                            <div className="input-group mb-3">

                                <select
                                    className="form-select mt-2"
                                    style={{
                                        maxWidth: "150px"
                                    }}
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                >

                                    <option value="All">
                                        All
                                    </option>

                                    <option value="Biryani">
                                        Biryani
                                    </option>

                                    <option value="Burger">
                                        Burger
                                    </option>

                                    <option value="Cakes">
                                        Cakes
                                    </option>

                                    <option value="Ice Creams">
                                        Ice Creams
                                    </option>

                                    <option value="Pizza">
                                        Pizza
                                    </option>

                                    <option value="Rolls">
                                        Rolls
                                    </option>

                                    <option value="Salad">
                                        Salad
                                    </option>

                                    <option value="Noodles">
                                        Noodles
                                    </option>

                                </select>


                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    placeholder="Search your favorite dish"
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                />


                                <button
                                    className="btn btn-primary mt-2"
                                    type="submit"
                                >
                                    <i className="bi bi-search"></i>
                                </button>

                            </div>

                        </form>

                    </div>

                </div>


                {/* Food Results */}
                <div className="row mt-4">

                    {filteredFoods.length > 0 ? (

                        filteredFoods.map((food, index) => {

                            const foodId = food.id || food._id;

                            return (
                                <div
                                    key={foodId || index}
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
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                onClick={() =>
                                                    handleAddToCart(food)
                                                }
                                            >
                                                <i className="bi bi-cart-plus me-1"></i>
                                                Add to Cart
                                            </button>


                                            <Link
                                                to={`/food/${foodId}`}
                                                className="btn btn-outline-secondary btn-sm"
                                            >
                                                View
                                            </Link>

                                        </div>

                                    </div>

                                </div>
                            );
                        })

                    ) : (

                        <div className="text-center mt-4">

                            <h4>
                                No food found.
                            </h4>

                        </div>

                    )}

                </div>

            </div>

        </>
    );
};

export default ExploreFood;