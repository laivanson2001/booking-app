import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";

const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/place/${id}`).then(({ data }) => {
            setPlace(data);
        });
    }, [id]);

    return (
        <div className="">
            {place && (
                <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
                    <h1 className="text-2xl">{place.title}</h1>
                    <AddressLink>{place.address}</AddressLink>
                    <PlaceGallery place={place} />
                    <div className="grid sm:grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 mb-8 gap-8">
                        <div className="">
                            <div className="my-4 ">
                                <h2 className="font-semibold text-2xl">
                                    Mô tả
                                </h2>
                                {place.description}
                            </div>
                            Thời gian nhận phòng: {place.checkIn}
                            <br />
                            Thời gian trả phòng: {place.checkOut}
                            <br />
                            Số lượng khách: {place.maxGuests}
                        </div>
                        <BookingWidget place={place} />
                    </div>
                    <div className="bg-white -mx-8 p-8 border-t">
                        <h2 className="font-semibold text-2xl">Mô tả</h2>
                        <div className="mt-2 mb-4 text-sm text-gray-700 leading-5">
                            {place.extraInfo}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlacePage;
