import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode";
import { useCart } from "../../context/CartContext";

const Checkout = () => {

    const navigate = useNavigate();

    const {
        cartItems,
        cartTotal,
        clearLocalCart
    } = useCart();

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [qrCode, setQrCode] = useState("");
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {

        if (paymentMethod !== "UPI") {

            setQrCode("");
            setPaymentConfirmed(false);

            return;
        }

        const generateQRCode = async () => {

            try {

                const upiLink =
                    `upi://pay?pa=foodiesdemo@upi&pn=Foodies&am=${cartTotal}&cu=INR`;

                const qrImage =
                    await QRCode.toDataURL(
                        upiLink,
                        {
                            width: 250,
                            margin: 2
                        }
                    );

                setQrCode(qrImage);

            } catch (error) {

                console.error(
                    "QR generation error:",
                    error
                );

                setMessage(
                    "Unable to generate UPI QR code."
                );
            }
        };

        generateQRCode();

    }, [paymentMethod, cartTotal]);

    const handlePaymentMethodChange = (method) => {

        setPaymentMethod(method);
        setMessage("");

        if (method === "COD") {
            setPaymentConfirmed(false);
        }
    };

    const handlePlaceOrder = async (event) => {

        event.preventDefault();

        const token =
            localStorage.getItem("token");

        if (!token) {

            navigate("/login");

            return;
        }

        if (cartItems.length === 0) {

            setMessage(
                "Your cart is empty."
            );

            return;
        }

        if (
            paymentMethod === "UPI" &&
            !paymentConfirmed
        ) {

            setMessage(
                "Please confirm the demo UPI payment before placing the order."
            );

            return;
        }

        setLoading(true);
        setMessage("");

        try {

            const response = await axios.post(
                "https://foodies-backend-1h8u.onrender.com/orders/create",
                {
                    address: address,
                    city: city,
                    pincode: pincode,
                    phone: phone,
                    paymentMethod: paymentMethod
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {

                clearLocalCart();

                navigate(
                    `/order-success/${response.data.id}`
                );
            }

        } catch (error) {

            const errorMessage =
                error.response?.data?.message ||
                "Unable to place order.";

            setMessage(errorMessage);

        } finally {

            setLoading(false);
        }
    };

    if (cartItems.length === 0) {

        return (
            <div className="container py-5">

                <div className="text-center">

                    <i
                        className="bi bi-cart-x"
                        style={{
                            fontSize: "60px"
                        }}
                    ></i>

                    <h3 className="mt-3">
                        Your cart is empty
                    </h3>

                    <Link
                        to="/explore"
                        className="btn btn-primary mt-3"
                    >
                        Explore Food
                    </Link>

                </div>

            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="row">

                <div className="col-lg-7">

                    <div className="card shadow-sm">

                        <div className="card-body p-4">

                            <h2 className="mb-4">
                                Checkout
                            </h2>

                            {message && (

                                <div className="alert alert-danger">
                                    {message}
                                </div>

                            )}

                            <form
                                onSubmit={handlePlaceOrder}
                            >

                                <div className="mb-3">

                                    <label className="form-label">
                                        Delivery Address
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Enter your complete address"
                                        value={address}
                                        onChange={(event) =>
                                            setAddress(
                                                event.target.value
                                            )
                                        }
                                        required
                                    ></textarea>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter city"
                                            value={city}
                                            onChange={(event) =>
                                                setCity(
                                                    event.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Pincode
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter pincode"
                                            value={pincode}
                                            onChange={(event) =>
                                                setPincode(
                                                    event.target.value
                                                )
                                            }
                                            maxLength="6"
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        value={phone}
                                        onChange={(event) =>
                                            setPhone(
                                                event.target.value
                                            )
                                        }
                                        maxLength="10"
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Payment Method
                                    </label>

                                    <div className="border rounded p-3">

                                        <div className="form-check mb-3">

                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                id="cod"
                                                value="COD"
                                                checked={
                                                    paymentMethod === "COD"
                                                }
                                                onChange={() =>
                                                    handlePaymentMethodChange(
                                                        "COD"
                                                    )
                                                }
                                            />

                                            <label
                                                className="form-check-label"
                                                htmlFor="cod"
                                            >
                                                Cash on Delivery
                                            </label>

                                        </div>

                                        <div className="form-check">

                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                id="upi"
                                                value="UPI"
                                                checked={
                                                    paymentMethod === "UPI"
                                                }
                                                onChange={() =>
                                                    handlePaymentMethodChange(
                                                        "UPI"
                                                    )
                                                }
                                            />

                                            <label
                                                className="form-check-label"
                                                htmlFor="upi"
                                            >
                                                UPI Payment
                                            </label>

                                        </div>

                                    </div>

                                </div>

                                {paymentMethod === "UPI" && (

                                    <div className="border rounded p-4 mb-4 text-center">

                                        <h5 className="mb-3">
                                            UPI Payment
                                        </h5>

                                        <div className="alert alert-warning">

                                            This is a demo UPI payment
                                            option for the Foodies project.

                                        </div>

                                        {qrCode && (

                                            <div className="mb-3">

                                                <img
                                                    src={qrCode}
                                                    alt="UPI QR Code"
                                                    style={{
                                                        width: "250px",
                                                        height: "250px"
                                                    }}
                                                />

                                            </div>

                                        )}

                                        <h6>
                                            Scan QR Code
                                        </h6>

                                        <p className="mb-1">
                                            UPI ID:
                                            {" "}
                                            <strong>
                                                foodiesdemo@upi
                                            </strong>
                                        </p>

                                        <p className="mb-3">
                                            Amount:
                                            {" "}
                                            <strong>
                                                ₹{cartTotal}
                                            </strong>
                                        </p>

                                        <div className="form-check text-start">

                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="paymentConfirmed"
                                                checked={
                                                    paymentConfirmed
                                                }
                                                onChange={(event) =>
                                                    setPaymentConfirmed(
                                                        event.target.checked
                                                    )
                                                }
                                            />

                                            <label
                                                className="form-check-label"
                                                htmlFor="paymentConfirmed"
                                            >
                                                I have completed the demo UPI payment
                                            </label>

                                        </div>

                                    </div>

                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={
                                        loading ||
                                        (
                                            paymentMethod === "UPI" &&
                                            !paymentConfirmed
                                        )
                                    }
                                >
                                    {loading
                                        ? "Placing Order..."
                                        : "Place Order"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

                <div className="col-lg-5 mt-4 mt-lg-0">

                    <div className="card shadow-sm">

                        <div className="card-body p-4">

                            <h4 className="mb-4">
                                Order Summary
                            </h4>

                            {cartItems.map((item) => {

                                const itemTotal =
                                    Number(
                                        item.price || 0
                                    ) *
                                    item.quantity;

                                return (

                                    <div
                                        key={
                                            item.foodId ||
                                            item.id ||
                                            item._id
                                        }
                                        className="d-flex justify-content-between align-items-center mb-3"
                                    >

                                        <div>

                                            <strong>
                                                {item.foodName}
                                            </strong>

                                            <div className="text-muted">
                                                ₹{item.price} × {item.quantity}
                                            </div>

                                        </div>

                                        <strong>
                                            ₹{itemTotal}
                                        </strong>

                                    </div>

                                );

                            })}

                            <hr />

                            <div className="d-flex justify-content-between">

                                <h5>
                                    Total
                                </h5>

                                <h5>
                                    ₹{cartTotal}
                                </h5>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Checkout;