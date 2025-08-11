import React, { useState } from "react";
import { loginUser } from "../api/auth";

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // state to hold message

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const data = await loginUser({ email, password });
            localStorage.setItem("token", data.token);
            setMessage("Login successful");
            alert(data.message);
            onLogin();
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <form
            className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
                Login
            </h2>

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
                className="w-full bg-gray-700 text-white py-2 rounded hover:bg-blue-900 transition-colors"
            >
                Login
            </button>

            {message && (
                <p
                    className={`mt-3 text-sm ${message === "Login successful" ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {message}
                </p>
            )}
        </form>
    );
};
export default LoginForm;
