import React from 'react';
import AOS from 'aos';

const LoginModal = ({ onClose, onLogin }) => {
    const handleLogin = () => {
        // Handle the login logic here (e.g., set user authentication)
        onLogin(); // Call the login function passed from the parent
    };

    return (
        <div className="login-modal" data-aos="fade-right">
            <div className="modal-content">
                <h2>Login</h2>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button onClick={handleLogin}>Login</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default LoginModal;