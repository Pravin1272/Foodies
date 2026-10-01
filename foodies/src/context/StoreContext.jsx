import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {

    const [foodList, setFoodList] = useState([]);

    const fetchFoodList = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/food/all"
            );

            console.log("Food data received:", response.data);

            setFoodList(response.data);

        } catch (error) {

            console.error("Error fetching food list:", error);

        }
    };

    useEffect(() => {

        fetchFoodList();

    }, []);

    const contextValue = {
        foodList
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};