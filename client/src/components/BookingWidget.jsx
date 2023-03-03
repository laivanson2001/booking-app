import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserContext";

const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    const { user } = UserState();

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(
            new Date(checkOut),
            new Date(checkIn)
        );
    }

    const bookPlace = async () => {
        const { data } = await axios.post("/api/place/booking", {
            place: place._id,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            price: numberOfNights * place.price,
        });
        const bookingId = data._id;
        navigate("/account/bookings/" + bookingId);
    };

    useEffect(() => {
        setName(user.name);
    }, [user]);

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <div className="text-2xl text-center">Giá: ${place.price}/đêm</div>
            <div className="border rounded-2xl">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label className="">Nhận phòng:</label>{" "}
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label className="">Trả phòng:</label>{" "}
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label className="">Khách: </label>{" "}
                    <input
                        type="number"
                        min="1"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(e.target.value)}
                    />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label className="">Họ tên: </label>{" "}
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label className="">Số điện thoại: </label>{" "}
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                )}
            </div>
            <button onClick={bookPlace} className="primary mt-4">
                Đặt phòng với{" "}
                {checkIn && checkOut && (
                    <span>${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    );
};

export default BookingWidget;
