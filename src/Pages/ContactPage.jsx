import React from "react";
import BreadCrumb from "../Components/BreadCrumb";
import ContactBlock from "../Components/ContactBlock";

const ContactPage = () => {
    return (
        <div className="contact-page">
            <BreadCrumb name="Contact Me" />
            <ContactBlock />
        </div>
    )
};

export default ContactPage;