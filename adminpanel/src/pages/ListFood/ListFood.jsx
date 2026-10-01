import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ListFood.css';

export const ListFood = () => {

    const [list, setList] = useState([]);

    const fetchList = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/food/all"
            );

            console.log(response.data);

            if (response.status === 200) {
                setList(response.data);
            }

        } catch (error) {

            console.log(error);

            alert("Error while reading foods");

        }

    };

    const removeFood = async (itemid) => {

        try {

            const response = await axios.delete(
                `http://localhost:8080/food/delete/${itemid}`
            );

            if (response.status === 200) {

                alert("Food Deleted Successfully");

                // Update the UI immediately
                setList((prevList) =>
                    prevList.filter((item) => item.id !== itemid)
                );

            }

        } catch (error) {

            console.log(error);

            alert("Error deleting food");

        }

    };

    useEffect(() => {
        fetchList();
    }, []);

    return (

        <div className="container mt-3">

            <table className="table table-bordered table-striped">

                <thead>

                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        list.map((item, index) => {

                            return (

                                <tr key={index}>

                                    <td>
                                        <img
                                            src={item.imageUrl}
                                            alt=""
                                            width={60}
                                            height={60}
                                        />
                                    </td>

                                    <td>{item.foodName}</td>

                                    <td>{item.category}</td>

                                    <td>{item.price}.00</td>

                                    <td className="text-danger">

                                        <i
                                            className="bi bi-x-circle-fill"
                                            style={{ cursor: "pointer", fontSize: "22px" }}
                                            onClick={() => removeFood(item.id)}
                                        ></i>

                                    </td>

                                </tr>

                            );

                        })
                    }

                </tbody>

            </table>

        </div>

    );

};

export default ListFood;