import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { addFood } from "../../services/foodService";

const AddFood = () => {

    const [image, setImage] = useState(false);

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    });

    const onChangeHandler = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

  const onSubmitHandler = async (event) => {

    event.preventDefault();

    try {

        const response = await addFood(data, image);

        console.log(response);

        alert("Food Added Successfully");

        setData({
            name: "",
            description: "",
            price: "",
            category: ""
        });

        setImage(false);

    } catch (error) {

        alert("Error Adding Food");
        console.log(error);

    }

};

    return (

        <div className="mx-2 mt-2">

            <form onSubmit={onSubmitHandler}>

                <div className="mb-3">

                    <label htmlFor="image" className="form-label">

                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload}
                            alt=""
                            width={89}
                        />

                    </label>

                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        required
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                </div>

                <div className="mb-3">

                    <label htmlFor="name" className="form-label">
                        Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="chiken biryani"
                        id="name"
                        name="name"
                        required
                        value={data.name}
                        onChange={onChangeHandler}
                    />

                </div>

                <div className="mb-3">

                    <label htmlFor="description" className="form-label">
                        Description
                    </label>

                    <textarea
                        className="form-control"
                        placeholder="Write description here"
                        id="description"
                        rows="5"
                        required
                        name="description"
                        value={data.description}
                        onChange={onChangeHandler}
                    ></textarea>

                </div>

                <div className="mb-3">

                    <label htmlFor="category" className="form-label">
                        Category
                    </label>

                    <select
                        name="category"
                        id="category"
                        className="form-control"
                        value={data.category}
                        onChange={onChangeHandler}
                    >
                        <option value="">Select Category</option>
                        <option value="Biryani">Biryani</option>
                        <option value="Cake">Cake</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Burger">Burger</option>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Ice cream">Ice cream</option>
                    </select>

                </div>

                <div className="mb-3">

                    <label htmlFor="price" className="form-label">
                        Price
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        placeholder='200'
                        id="price"
                        name="price"
                        required
                        value={data.price}
                        onChange={onChangeHandler}
                    />

                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Save
                </button>

            </form>

        </div>

    );
};

export default AddFood;