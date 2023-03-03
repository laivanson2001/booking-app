import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Perk from "../components/Perk";
import PhotoUploader from "../components/PhotoUploader";
import AccountNav from "../components/AccountNav";

const PlacesFormPage = () => {
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const navigate = useNavigate();
    const { id } = useParams();

    const savePlace = async (e) => {
        e.preventDefault();
        const placeData = {
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        };
        if (id) {
            await axios.put("/api/place", {
                id,
                ...placeData,
            });
        } else {
            await axios.post("/api/place", placeData);
        }
        navigate("/account/places");
    };

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/place/${id}`).then(({ data }) => {
            setTitle(data.title);
            setAddress(data.address);
            setPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    return (
        <div className="">
            <AccountNav />
            <form onSubmit={savePlace}>
                <h2 className="text-xl mt-4">Tên chỗ ở</h2>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Nhập tên chỗ ở"
                />
                <h2 className="text-xl mt-4">Địa chỉ</h2>
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="Nhập địa chỉ"
                />
                <PhotoUploader photos={photos} setPhotos={setPhotos} />
                <h2 className="text-xl mt-4">Mô tả</h2>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="resize-none h-48"
                />
                <Perk perks={perks} setPerks={setPerks} />
                <h2 className="text-xl mt-4">Thông tin thêm</h2>
                <textarea
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                    className="resize-none h-48"
                />
                <h2 className="text-xl mt-4">Thời gian nhận/trả phòng</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="">
                        <h3 className="mt-2 -m-1">Thời gian nhận</h3>
                        <input
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            type="text"
                            placeholder="14"
                        />
                    </div>
                    <div className="">
                        <h3 className="mt-2 -m-1">Thời gian trả</h3>
                        <input
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            type="text"
                            placeholder="18"
                        />
                    </div>
                    <div className="">
                        <h3 className="mt-2 -m-1">Số người</h3>
                        <input
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.value)}
                            type="number"
                            min={1}
                        />
                    </div>
                    <div className="">
                        <h3 className="mt-2 -m-1">Giá 1 đêm</h3>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            min={1}
                        />
                    </div>
                </div>
                <button className="primary my-4">Lưu lại</button>
            </form>
        </div>
    );
};

export default PlacesFormPage;
