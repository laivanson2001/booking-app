import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";

const PlacesPage = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get("/api/place").then(({ data }) => {
            setPlaces(data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link
                    className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full "
                    to="/account/places/new"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    Thêm chỗ ở
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 &&
                    places.map((place, index) => (
                        <Link
                            to={`/account/places/${place._id}`}
                            className="flex gap-4 bg-gray-200 p-2 rounded-2xl cursor-pointer"
                            key={index}
                        >
                            <div className="flex w-32 h-32 bg-gray-500 grow shrink-0">
                                {place.photos.length > 0 && (
                                    <img
                                        className="object-cover"
                                        src={
                                            "http://localhost:5000/uploads/" +
                                            place.photos[
                                                place.photos.length - 1
                                            ]
                                        }
                                        alt=""
                                    />
                                )}
                            </div>
                            <div className="">
                                <div className="text-xl">{place.title}</div>
                                <p className="text-sm mt-2">
                                    {place.description}
                                </p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default PlacesPage;
