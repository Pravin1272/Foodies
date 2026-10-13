import axios from "axios";

const API_URL = "https://foodies-backend-1h8u.onrender.com/food/all";

export const fetchFoodList = async () => {

    try {

        const response = await axios.get(API_URL);

        return response.data;

    } catch (error) {

        console.error("Error fetching food list:", error);

        throw error;
    }
};


export const fetchFoodDetails = async (id) => {

    try {

        const response = await axios.get(
            `https://foodies-backend-1h8u.onrender.com/food/${id}`
        );

        return response.data;

    } catch (error) {

        console.error("Error fetching food details:", error);

        throw error;
    }
};