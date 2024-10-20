import React, { useState } from "react";

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ name: "", message: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <h4>Contact Us!</h4>
            <p>Got questions for me? Feel free to reach out.</p>

            <div className="form-group">
                <textarea
                    name="message"
                    id="message"
                    placeholder="Write a Message ..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">Contact</button>
        </form>
    );
};

export default ContactForm;