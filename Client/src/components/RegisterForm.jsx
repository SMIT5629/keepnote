import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            await registerUser({ username, email, password });
            setMessage("Registration successful");
        } catch (error) {
            setMessage(error.response?.data?.message || "Register failed");
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <form
            className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
                Register
            </h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
            />

            <button
                type="submit"
                className="w-full bg-gray-600 text-white py-2 rounded hover:bg-blue-900 transition-colors"
            >
                Register
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Login
                </Link>
            </p>

            {message && (
                <p
                    className={`mt-3 text-sm text-center ${message === "Registration successful"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                >
                    {message}
                </p>
            )}
        </form>
    );
};
export default RegisterForm;
