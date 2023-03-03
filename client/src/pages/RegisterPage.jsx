import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/user/register", { name, email, password });
            Swal.fire("Đăng kí thành công!", "", "success").then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        } catch (error) {
            Swal.fire("Lỗi...", "", "error");
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Đăng Ký</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nhập tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        Đăng Ký
                    </button>
                    <div className="text-center py-2 text-gray-500">
                        Đã có tài khoản?{" "}
                        <Link className="underline text-black" to="/login">
                            Đăng nhập ngay
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
