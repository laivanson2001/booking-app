import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserState } from "../context/UserContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser, setLogin } = UserState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/user/login", {
                email,
                password,
            });
            setUser(data);
            Swal.fire("Đăng nhập thành công!", "", "success");
            setTimeout(() => {
                Swal.close();
                setLogin(true);
                navigate("/");
            }, 1000);
        } catch (error) {
            Swal.fire("Lỗi...", "", "error");
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Đăng Nhập</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Nhập email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="primary" type="submit">
                        Đăng Nhập
                    </button>
                    <div className="text-center py-2 text-gray-500">
                        Chưa có tài khoản?{" "}
                        <Link className="underline text-black" to="/register">
                            Đăng ký ngay
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
