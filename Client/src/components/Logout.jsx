import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        navigate("/login");
        window.dispatchEvent(new Event("storage")); // update Navbar instantly
    }, [navigate]);

    return null;
};

export default Logout;
