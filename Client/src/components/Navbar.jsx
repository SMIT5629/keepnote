import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [location]); // re-run when route changes

    const linkClasses = ({ isActive }) =>
        `px-4 py-2 rounded transition-colors duration-200 ${isActive ? "text-blue-600 " : "text-gray-700 hover:bg-blue-100"
        }`;


    return (
        <nav className="bg-white shadow-md px-6 py-3 flex items-center gap-4 sticky top-0 z-50">
            <NavLink to="/" className={linkClasses}>
                Home
            </NavLink>

            {!isLoggedIn && (
                <>
                    <NavLink to="/login" className={linkClasses}>
                        Login
                    </NavLink>
                    <NavLink to="/register" className={linkClasses}>
                        Register
                    </NavLink>
                </>
            )}

            {isLoggedIn && (
                <>
                    <NavLink to="/notes" className={linkClasses}>
                        Notes
                    </NavLink>
                    <NavLink to="/logout" className="ml-auto px-4 py-2  text-red-700 rounded hover:bg-gray-100 transition-colors">
                        Logout
                    </NavLink>
                </>
            )}
        </nav>
    );
};

export default Navbar;
