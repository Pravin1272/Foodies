import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MyOrders = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const fetchOrders = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            const response = await axios.get(
                "http://localhost:8080/orders/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setOrders(response.data || []);

        } catch (error) {

            console.error("Error fetching orders:", error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("userEmail");

                navigate("/login");

                return;
            }

            setMessage(
                error.response?.data?.message ||
                "Unable to load your orders."
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusClass = (status) => {

        switch (status) {

            case "PENDING":
                return "bg-warning text-dark";

            case "CONFIRMED":
                return "bg-primary";

            case "PREPARING":
                return "bg-info text-dark";

            case "OUT FOR DELIVERY":
                return "bg-primary";

            case "DELIVERED":
                return "bg-success";

            case "CANCELLED":
                return "bg-danger";

            default:
                return "bg-secondary";
        }
    };

    if (loading) {

        return (
            <div className="container py-5 text-center">

                <div className="spinner-border text-primary"></div>

                <p className="mt-3">
                    Loading your orders...
                </p>

            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    My Orders
                </h2>

                <Link
                    to="/"
                    className="btn btn-outline-primary"
                >
                    Continue Shopping
                </Link>

            </div>

            {message && (
                <div className="alert alert-danger">
                    {message}
                </div>
            )}

            {orders.length === 0 && !message ? (

                <div className="card shadow-sm">

                    <div className="card-body text-center p-5">

                        <i
                            className="bi bi-bag-x"
                            style={{
                                fontSize: "60px"
                            }}
                        ></i>

                        <h4 className="mt-3">
                            No orders found
                        </h4>

                        <p className="text-muted">
                            You have not placed any orders yet.
                        </p>

                        <Link
                            to="/"
                            className="btn btn-primary"
                        >
                            Start Shopping
                        </Link>

                    </div>

                </div>

            ) : (

                orders.map((order) => (

                    <div
                        className="card shadow-sm mb-4"
                        key={order.id}
                    >

                        <div className="card-header bg-white">

                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                                <div>

                                    <strong>
                                        Order ID
                                    </strong>

                                    <div className="text-muted">
                                        {order.id}
                                    </div>

                                </div>

                                <span
                                    className={`badge ${getStatusClass(order.status)}`}
                                >
                                    {order.status}
                                </span>

                            </div>

                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-7">

                                    <h5 className="mb-3">
                                        Ordered Items
                                    </h5>

                                    {order.items?.map(
                                        (item, index) => (

                                            <div
                                                key={
                                                    item.foodId ||
                                                    item.id ||
                                                    index
                                                }
                                                className="d-flex align-items-center border-bottom pb-3 mb-3"
                                            >

                                                {item.imageUrl && (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.foodName}
                                                        style={{
                                                            width: "70px",
                                                            height: "70px",
                                                            objectFit: "cover",
                                                            borderRadius: "8px",
                                                            marginRight: "15px"
                                                        }}
                                                    />
                                                )}

                                                <div className="flex-grow-1">

                                                    <h6 className="mb-1">
                                                        {item.foodName}
                                                    </h6>

                                                    <div className="text-muted">
                                                        Quantity: {item.quantity}
                                                    </div>

                                                    <div>
                                                        ₹{item.price}
                                                    </div>

                                                </div>

                                                <strong>
                                                    ₹{Number(item.price || 0) * Number(item.quantity || 0)}
                                                </strong>

                                            </div>

                                        )
                                    )}

                                </div>

                                <div className="col-md-5">

                                    <div className="border rounded p-3">

                                        <h5 className="mb-3">
                                            Delivery Details
                                        </h5>

                                        <p className="mb-2">
                                            <strong>Address:</strong>{" "}
                                            {order.address}
                                        </p>

                                        <p className="mb-2">
                                            <strong>City:</strong>{" "}
                                            {order.city}
                                        </p>

                                        <p className="mb-2">
                                            <strong>Pincode:</strong>{" "}
                                            {order.pincode}
                                        </p>

                                        <p className="mb-2">
                                            <strong>Phone:</strong>{" "}
                                            {order.phone}
                                        </p>

                                        <p className="mb-2">
                                            <strong>Payment:</strong>{" "}
                                            {order.paymentMethod}
                                        </p>

                                        <hr />

                                        <div className="d-flex justify-content-between">

                                            <strong>
                                                Total Amount
                                            </strong>

                                            <strong className="text-success">
                                                ₹{order.totalAmount}
                                            </strong>

                                        </div>

                                        {order.createdAt && (
                                            <div className="text-muted mt-2">

                                                Ordered on:{" "}
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleString()}

                                            </div>
                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                ))
            )}

        </div>
    );
};

export default MyOrders;