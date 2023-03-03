import axios from "axios";
import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { UserState } from "../context/UserContext";
import PlacesPage from "./PlacesPage";

const ProfilePage = () => {
    const { login, user, setUser } = UserState();
    let { subpage } = useParams();
    const navigate = useNavigate();

    if (!login) {
        return "Loading...";
    }
    if (login && !user) {
        <Navigate to="/login" />;
    }

    if (subpage === undefined) {
        subpage = "profile";
    }

    const handleLogout = async () => {
        await axios.post("/api/user/logout");
        navigate("/");
        setUser(null);
    };

    return (
        <div>
            <AccountNav />
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Bạn đang nhập với tên {user.name} ({user.email}) <br />
                    <button
                        className="primary max-w-sm mt-2"
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </button>
                </div>
            )}
            {subpage === "places" && <PlacesPage />}
        </div>
    );
};

export default ProfilePage;
