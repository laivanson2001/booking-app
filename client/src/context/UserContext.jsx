import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (!user) {
            axios.get("/api/user/profile").then(({ data }) => {
                setUser(data);
                setLogin(true);
            });
        }
    });

    return (
        <UserContext.Provider value={{ user, setUser, login, setLogin }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserState = () => {
    return useContext(UserContext);
};

export default UserProvider;
