import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const fetchOrders = async () => {

        try {

            setLoading(true);
            setMessage("");

            const response = await axios.get(
                "https://foodies-backend-1h8u.onrender.com/orders/all"
            );

            setOrders(response.data);

        } catch (error) {

            console.error(
                "Error fetching orders:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Unable to load orders."
            );

        } finally {

            setLoading(false);
        }
    };

    const updateStatus = async (
        orderId,
        status
    ) => {

        try {

            const response = await axios.put(
                `https://foodies-backend-1h8u.onrender.com/orders/${orderId}/status`,
                {
                    status: status
                }
            );

            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order.id === orderId
                        ? response.data
                        : order
                )
            );

            alert(
                "Order status updated successfully."
            );

        } catch (error) {

            console.error(
                "Error updating order status:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to update order status."
            );
        }
    };

    const deleteOrder = async (orderId) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this order?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await axios.delete(
                `https://foodies-backend-1h8u.onrender.com/orders/${orderId}`
            );

            setOrders((previousOrders) =>
                previousOrders.filter(
                    (order) =>
                        order.id !== orderId
                )
            );

            alert(
                "Order deleted successfully."
            );

        } catch (error) {

            console.error(
                "Error deleting order:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to delete order."
            );
        }
    };

    const getStatusClass = (status) => {

        switch (status) {

            case "PENDING":
                return "bg-warning text-dark";

            case "CONFIRMED":
                return "bg-primary";

            case "PREPARING":
                return "bg-info text-dark";

            case "OUT FOR DELIVERY":
                return "bg-secondary";

            case "DELIVERED":
                return "bg-success";

            case "CANCELLED":
                return "bg-danger";

            default:
                return "bg-dark";
        }
    };

    useEffect(() => {

        fetchOrders();

    }, []);

    if (loading) {

        return (
            <div className="container-fluid mt-4">

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <p className="mt-3">
                        Loading orders...
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="container-fluid mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    Orders
                </h2>

                <button
                    className="btn btn-primary"
                    onClick={fetchOrders}
                >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Refresh
                </button>

            </div>

            {message && (

                <div className="alert alert-danger">
                    {message}
                </div>

            )}

            {orders.length === 0 ? (

                <div className="card shadow-sm">

                    <div className="card-body text-center py-5">

                        <i
                            className="bi bi-bag-x"
                            style={{
                                fontSize: "60px"
                            }}
                        ></i>

                        <h4 className="mt-3">
                            No Orders Found
                        </h4>

                        <p className="text-muted">
                            Customer orders will appear here.
                        </p>

                    </div>

                </div>

            ) : (

                <div className="row">

                    {orders.map((order) => (

                        <div
                            className="col-12 mb-4"
                            key={order.id}
                        >

                            <div className="card shadow-sm">

                                <div className="card-header bg-light">

                                    <div className="row align-items-center">

                                        <div className="col-md-4">

                                            <strong>
                                                Order ID
                                            </strong>

                                            <div className="text-muted small">
                                                {order.id}
                                            </div>

                                        </div>

                                        <div className="col-md-4">

                                            <strong>
                                                Customer
                                            </strong>

                                            <div>
                                                {order.userEmail}
                                            </div>

                                        </div>

                                        <div className="col-md-4 text-md-end">

                                            <span
                                                className={`badge ${getStatusClass(order.status)}`}
                                            >
                                                {order.status}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                <div className="card-body">

                                    <div className="row">

                                        <div className="col-lg-7">

                                            <h5 className="mb-3">
                                                Ordered Items
                                            </h5>

                                            {order.items &&
                                                order.items.map(
                                                    (item, index) => (

                                                        <div
                                                            key={index}
                                                            className="d-flex align-items-center border-bottom pb-3 mb-3"
                                                        >

                                                            <img
                                                                src={item.imageUrl}
                                                                alt={item.foodName}
                                                                style={{
                                                                    width: "70px",
                                                                    height: "70px",
                                                                    objectFit: "cover",
                                                                    borderRadius: "8px"
                                                                }}
                                                            />

                                                            <div className="ms-3 flex-grow-1">

                                                                <h6 className="mb-1">
                                                                    {item.foodName}
                                                                </h6>

                                                                <div className="text-muted">
                                                                    ₹{item.price} × {item.quantity}
                                                                </div>

                                                            </div>

                                                            <strong>
                                                                ₹
                                                                {
                                                                    Number(
                                                                        item.price || 0
                                                                    ) *
                                                                    item.quantity
                                                                }
                                                            </strong>

                                                        </div>

                                                    )
                                                )}

                                            <div className="d-flex justify-content-between align-items-center">

                                                <h5 className="mb-0">
                                                    Total Amount
                                                </h5>

                                                <h4 className="mb-0">
                                                    ₹{order.totalAmount}
                                                </h4>

                                            </div>

                                        </div>

                                        <div className="col-lg-5 mt-4 mt-lg-0">

                                            <div className="card bg-light">

                                                <div className="card-body">

                                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                                        <h5 className="mb-0">
                                                            Delivery Details
                                                        </h5>

                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() =>
                                                                deleteOrder(
                                                                    order.id
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-trash me-1"></i>
                                                            Delete
                                                        </button>

                                                    </div>

                                                    <p className="mb-2">
                                                        <strong>
                                                            Address:
                                                        </strong>
                                                        {" "}
                                                        {order.address}
                                                    </p>

                                                    <p className="mb-2">
                                                        <strong>
                                                            City:
                                                        </strong>
                                                        {" "}
                                                        {order.city}
                                                    </p>

                                                    <p className="mb-2">
                                                        <strong>
                                                            Pincode:
                                                        </strong>
                                                        {" "}
                                                        {order.pincode}
                                                    </p>

                                                    <p className="mb-2">
                                                        <strong>
                                                            Phone:
                                                        </strong>
                                                        {" "}
                                                        {order.phone}
                                                    </p>

                                                    <p className="mb-3">
                                                        <strong>
                                                            Payment:
                                                        </strong>
                                                        {" "}
                                                        {order.paymentMethod}
                                                    </p>

                                                    <p className="mb-3">
                                                        <strong>
                                                            Ordered At:
                                                        </strong>
                                                        {" "}
                                                        {order.createdAt
                                                            ? new Date(
                                                                order.createdAt
                                                            ).toLocaleString()
                                                            : "N/A"}
                                                    </p>

                                                    <label className="form-label">
                                                        Update Order Status
                                                    </label>

                                                    <select
                                                        className="form-select"
                                                        value={
                                                            order.status
                                                        }
                                                        onChange={(event) =>
                                                            updateStatus(
                                                                order.id,
                                                                event.target.value
                                                            )
                                                        }
                                                    >

                                                        <option value="PENDING">
                                                            Pending
                                                        </option>

                                                        <option value="CONFIRMED">
                                                            Confirmed
                                                        </option>

                                                        <option value="PREPARING">
                                                            Preparing
                                                        </option>

                                                        <option value="OUT FOR DELIVERY">
                                                            Out for Delivery
                                                        </option>

                                                        <option value="DELIVERED">
                                                            Delivered
                                                        </option>

                                                        <option value="CANCELLED">
                                                            Cancelled
                                                        </option>

                                                    </select>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Orders;