import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);

    // ✅ Check localStorage on app start to restore user/admin
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedAdmin = localStorage.getItem("admin");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
    }, []);

    // ✅ Save user to localStorage when it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user"); // Clear storage if logged out
        }
    }, [user]);

    // ✅ Save admin to localStorage when it changes
    useEffect(() => {
        if (admin) {
            localStorage.setItem("admin", JSON.stringify(admin));
        } else {
            localStorage.removeItem("admin");
        }
    }, [admin]);

    return (
        <UserContext.Provider value={{ user, setUser, admin, setAdmin }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
