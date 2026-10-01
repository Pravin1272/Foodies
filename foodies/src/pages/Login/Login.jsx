import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";

const Login = () => {

    const navigate = useNavigate();

    const { fetchCart } = useCart();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:8080/auth/login",
                {
                    email: email,
                    password: password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "userEmail",
                email
            );

            await fetchCart();

            alert("Login successful!");

            navigate("/");

        } catch (error) {

            const errorMessage =
                error.response?.data?.message ||
                "Login failed. Please check your email and password.";

            setMessage(errorMessage);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Login
                            </h2>

                            {message && (
                                <div className="alert alert-danger">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Logging in..."
                                        : "Login"}
                                </button>

                            </form>

                            <p className="text-center mt-3 mb-0">

                                Don't have an account?{" "}

                                <Link to="/register">
                                    Register
                                </Link>

                            </p>

                            <div className="text-center mt-2">

                                <Link
                                    to="/admin-login"
                                    className="text-decoration-none"
                                >
                                    Admin Panel
                                </Link>

                            </div>

                            <div className="text-center mt-2">

                                <Link to="/">
                                    Back to Home
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;