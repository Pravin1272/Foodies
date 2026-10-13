import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";

export const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "https://foodies-backend-1h8u.onrender.com/contact/save",
        formData
      );

      setSuccessMessage(
        "Your message has been submitted successfully!"
      );

      setErrorMessage("");

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      console.error("Error submitting contact form:", error);

      setErrorMessage(
        "Failed to submit your message. Please try again."
      );

      setSuccessMessage("");
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <div className="container-fluid">

          {/* Logo */}
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt="Foodies"
              width="45"
              height="45"
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div
            className="collapse navbar-collapse"
            id="navbarContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/explore">
                  Explore
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link active" href="/contact">
                  Contact us
                </a>
              </li>

            </ul>

            {/* Right Side */}
            <div className="d-flex align-items-center gap-3">

              <button className="btn btn-outline-warning rounded-circle">
                <i className="bi bi-cart3"></i>
              </button>

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

      {/* Contact Section */}
      <section id="contact" className="py-5">

        <div className="container px-4 px-lg-5">

          <div className="row gx-4 gx-lg-5 justify-content-center">

            <div className="col-lg-8 col-xl-6 text-center">

              <h2 className="mt-0">
                Let's Get In Touch!
              </h2>

              <hr className="divider" />

              <p className="text-muted mb-5">
                Ready to start your next project with us? Send us a message
                and we will get back to you as soon as possible!
              </p>

            </div>

          </div>

          <div className="row gx-4 gx-lg-5 justify-content-center mb-5">

            <div className="col-lg-6">

              <form onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="form-floating mb-3">

                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="name">
                    Full name
                  </label>

                </div>

                {/* Email */}
                <div className="form-floating mb-3">

                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="email">
                    Email address
                  </label>

                </div>

                {/* Message */}
                <div className="form-floating mb-3">

                  <textarea
                    className="form-control"
                    id="message"
                    placeholder="Enter your message here..."
                    style={{ height: "10rem" }}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>

                  <label htmlFor="message">
                    Message
                  </label>

                </div>

                {/* Success Message */}
                {successMessage && (
                  <div className="alert alert-success">
                    {successMessage}
                  </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <div className="alert alert-danger">
                    {errorMessage}
                  </div>
                )}

                {/* Submit */}
                <div className="d-grid">

                  <button
                    className="btn btn-primary btn-xl"
                    type="submit"
                  >
                    Submit
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </section>
    </>
  );
};

export default Contact;