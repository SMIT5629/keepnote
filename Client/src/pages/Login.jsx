import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
    const handleLogin = () => {
        window.location.href = "/notes";
    };

    return (
        <div>
            <LoginForm onLogin={handleLogin} />
        </div>
    );
};

export default Login;
