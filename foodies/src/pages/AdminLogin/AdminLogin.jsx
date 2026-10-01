import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {

        event.preventDefault();

        if (password === "admin123") {

            window.location.href = "http://localhost:5175/";

        } else {

            setMessage("Incorrect admin password.");
            setPassword("");
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Admin Access
                            </h2>

                            {message && (
                                <div className="alert alert-danger">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Admin Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter admin password"
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
                                >
                                    Continue
                                </button>

                            </form>

                            <div className="text-center mt-3">

                                <Link to="/login">
                                    Back to Login
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

export default AdminLogin;