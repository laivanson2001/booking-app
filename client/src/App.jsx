import axios from "axios";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserState } from "./context/UserContext";
import Layout from "./layout/Layout";
import BookingPage from "./pages/BookingPage";
import BookingsPage from "./pages/BookingsPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import PlacePage from "./pages/PlacePage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacesPage from "./pages/PlacesPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
    const { login, user } = UserState();

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/account" element={<ProfilePage />} />
                <Route path="/account/places" element={<PlacesPage />} />
                <Route
                    path="/account/places/new"
                    element={<PlacesFormPage />}
                />
                <Route
                    path="/account/places/:id"
                    element={<PlacesFormPage />}
                />
                <Route path="/place/:id" element={<PlacePage />} />
                <Route path="/account/bookings" element={<BookingsPage />} />
                <Route path="/account/bookings/:id" element={<BookingPage />} />
            </Route>
        </Routes>
    );
}

export default App;
