import React from "react";
import { Link, useParams } from "react-router-dom";

const OrderSuccess = () => {

    const { orderId } = useParams();

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-7">

                    <div className="card shadow text-center">

                        <div className="card-body p-5">

                            <i
                                className="bi bi-check-circle-fill text-success"
                                style={{
                                    fontSize: "80px"
                                }}
                            ></i>

                            <h2 className="mt-4">
                                Order Placed Successfully!
                            </h2>

                            <p className="mt-3">
                                Thank you for ordering from Foodies.
                            </p>

                            <div className="alert alert-light border mt-4">

                                <strong>
                                    Order ID
                                </strong>

                                <div className="mt-2">
                                    {orderId}
                                </div>

                            </div>

                            <div className="d-flex justify-content-center gap-3 mt-4">

                                <Link
                                    to="/"
                                    className="btn btn-primary"
                                >
                                    Continue Shopping
                                </Link>

                                <Link
                                    to="/my-orders"
                                    className="btn btn-outline-primary"
                                >
                                    My Orders
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default OrderSuccess;
