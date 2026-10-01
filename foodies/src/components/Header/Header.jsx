import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { StoreContext } from "../../context/StoreContext";
import logo from "../../assets/logo.png";

const Header = () => {

    const { cartItems, clearLocalCart } = useCart();
    const { foodList } = useContext(StoreContext);

    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState(
        new URLSearchParams(location.search).get("search") || ""
    );

    const token = localStorage.getItem("token");

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const foodNames = [
        ...new Set(
            foodList
                .map((food) => food.foodName)
                .filter((name) => name)
        )
    ];

    const handleSearch = (event) => {

        const value = event.target.value;

        setSearchTerm(value);

        navigate(
            `/?search=${encodeURIComponent(value)}`,
            {
                replace: true
            }
        );
    };

    const handleClearSearch = () => {

        setSearchTerm("");

        navigate("/", {
            replace: true
        });
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        clearLocalCart();

        navigate("/login");
    };

    return (
        <header className="container-fluid py-3">

            <div className="d-flex align-items-center justify-content-between">

                <div className="d-flex align-items-center gap-4">

                    <Link
                        to="/"
                        className="text-decoration-none"
                    >
                        <div
                            style={{
                                width: "55px",
                                height: "45px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <img
                                src={logo}
                                alt="Foodies"
                                style={{
                                    width: "55px",
                                    height: "45px",
                                    objectFit: "contain"
                                }}
                            />
                        </div>
                    </Link>

                    <Link
                        to="/"
                        className="text-decoration-none text-dark"
                    >
                        Home
                    </Link>

                    <Link
                        to="/explore"
                        className="text-decoration-none text-dark"
                    >
                        Explore
                    </Link>

                    <Link
                        to="/contact"
                        className="text-decoration-none text-dark"
                    >
                        Contact us
                    </Link>

                </div>

                <div
                    className="d-flex align-items-center gap-3"
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        marginLeft: "30px",
                        marginRight: "30px"
                    }}
                >

                    <div
                        className="input-group"
                        style={{
                            maxWidth: "420px"
                        }}
                    >

                        <span className="input-group-text bg-white">
                            <i className="bi bi-search"></i>
                        </span>

                        <input
                            type="text"
                            className="form-control"
                            list="food-search-names"
                            placeholder="Search food..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />

                        {searchTerm && (
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={handleClearSearch}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        )}

                        <datalist id="food-search-names">

                            {foodNames.map((name, index) => (
                                <option
                                    value={name}
                                    key={index}
                                />
                            ))}

                        </datalist>

                    </div>

                </div>

                <div className="d-flex align-items-center gap-3">

                    <Link
                        to="/cart"
                        className="btn btn-outline-warning rounded-circle position-relative"
                        style={{
                            width: "48px",
                            height: "48px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >

                        <i className="bi bi-cart3"></i>

                        {cartCount > 0 && (
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            >
                                {cartCount}
                            </span>
                        )}

                    </Link>

                    {token ? (

                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    ) : (

                        <>
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
                        </>

                    )}

                </div>

            </div>

        </header>
    );
};

export default Header;