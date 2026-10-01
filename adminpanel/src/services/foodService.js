import axios from "axios";


const API_URL = "http://localhost:8080/food";

export const addFood = async (foodData, image) => {

    const formData = new FormData();

    formData.append("foodName", foodData.name);
    formData.append("description", foodData.description);
    formData.append("price", foodData.price);
    formData.append("category", foodData.category);
    formData.append("file", image);

    try {

        const response = await axios.post(
            `${API_URL}/add`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error("Error Adding Food:", error);
        throw error;

    }
};

