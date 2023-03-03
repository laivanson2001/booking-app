import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const IndexPage = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get("/api/place/show").then(({ data }) => {
            setPlaces(data);
        });
    }, []);

    return (
        <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {places.length > 0 &&
                places.map((place, index) => (
                    <Link to={"/place/" + place._id} className="" key={index}>
                        <div className="bg-gray-500 rounded-2xl mb-2">
                            {place.photos?.[place.photos.length - 1] && (
                                <img
                                    className="rounded-2xl aspect-square object-cover"
                                    src={
                                        "http://localhost:5000/uploads/" +
                                        place.photos?.[place.photos.length - 1]
                                    }
                                    alt=""
                                />
                            )}
                        </div>
                        <h2 className="font-bold">{place.address}</h2>
                        <h3 className="text-sm truncate text-gray-500">
                            {place.title}
                        </h3>
                        <div className="mt-1">
                            <span className="font-bold">${place.price}</span>{" "}
                            đêm
                        </div>
                    </Link>
                ))}
        </div>
    );
};

export default IndexPage;
