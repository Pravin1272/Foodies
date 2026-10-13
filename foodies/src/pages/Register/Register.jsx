import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");

        // Check password and confirm password
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        // Check minimum password length
        if (password.length < 6) {
            setMessage("Password must contain at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            await axios.post(
                "https://foodies-backend-1h8u.onrender.com/auth/register",
                {
                    name: name,
                    email: email,
                    password: password
                }
            );

            alert("Registration successful! Please login.");

            navigate("/login");

        } catch (error) {

            console.error("Registration error:", error);

            if (error.response) {

                if (typeof error.response.data === "string") {
                    setMessage(error.response.data);
                } else if (error.response.data?.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage("Registration failed. Please try again.");
                }

            } else {
                setMessage(
                    "Unable to connect to the server. Please make sure Spring Boot is running."
                );
            }

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
                                Create Account
                            </h2>

                            {message && (
                                <div className="alert alert-danger">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                {/* Full Name */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(event) =>
                                            setName(event.target.value)
                                        }
                                        required
                                    />

                                </div>

                                {/* Email */}
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

                                {/* Password */}
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

                                {/* Confirm Password */}
                                <div className="mb-3">

                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(event) =>
                                            setConfirmPassword(
                                                event.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Creating account..."
                                        : "Register"}
                                </button>

                            </form>

                            <p className="text-center mt-3 mb-0">

                                Already have an account?{" "}

                                <Link to="/login">
                                    Login
                                </Link>

                            </p>

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

export default Register;