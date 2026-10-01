import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import headerImage from "../../assets/header.jpg";

const Home = () => {

    const [searchParams] = useSearchParams();

    const searchTerm = searchParams.get("search") || "";

    return (
        <>
            <Header />

            <div
                className="container"
                style={{
                    marginTop: "20px",
                    marginBottom: "20px"
                }}
            >
                <div
                    style={{
                        position: "relative",
                        minHeight: "350px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        backgroundImage: `url(${headerImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.45)"
                        }}
                    ></div>

                    <div
                        style={{
                            position: "relative",
                            zIndex: 1,
                            padding: "50px",
                            maxWidth: "700px"
                        }}
                    >

                        <h1
                            style={{
                                fontSize: "48px",
                                fontWeight: "700",
                                marginBottom: "12px",
                                color: "#ffffff"
                            }}
                        >
                            Order your favorite food here
                        </h1>

                        <p
                            style={{
                                fontSize: "20px",
                                marginBottom: "20px",
                                color: "#ffffff"
                            }}
                        >
                            Discover the best food and drinks in Pune
                        </p>

                        <a
                            href="#food-menu"
                            className="btn btn-primary"
                            style={{
                                fontSize: "18px",
                                padding: "10px 18px"
                            }}
                        >
                            Explore
                        </a>

                    </div>
                </div>
            </div>

            <ExploreMenu />

            <div id="food-menu">
                <FoodDisplay
                    category="All"
                    searchTerm={searchTerm}
                />
            </div>
        </>
    );
};

export default Home;