import React from "react";
import { useNavigate } from "react-router-dom";
import blogData from "../Data/blogData.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import FooterGallery from "./FooterGallery";

const Footer = () => {

    const navigate = useNavigate(); // Hook for navigation

    // Get unique categories, sort them alphabetically
    const uniqueCategories = Array.from(new Set(blogData.map(blog => blog.category))).sort();

    // Function to handle click and navigate to Blogs page with category
    const handleCategoryClick = (category) => {
        navigate("/blog", { state: { selectedCategory: category } }); // Pass the category via state
    };

    return (
        <>
            <FooterGallery />
            <footer>
                <div className="footer-top">
                    <div className="ft-one">
                        <h5>Socials</h5>
                        <ul>
                            <li>Facebook</li>
                            <li>Linkedin</li>
                            <li>Instagram</li>
                            <li>X</li>
                        </ul>
                    </div>
                    <div className="ft-two">
                        <img src="https://zoya.qodeinteractive.com/wp-content/uploads/2021/04/footer-logo-img-01-300x81.png" alt="footer logo" />
                        <p>The perfect place for telling & sharing all the stories that truly matter</p>
                        <label htmlFor="newsletter">
                            <input 
                                type="email" 
                                name="newsletter" 
                                id="newsletter" 
                                placeholder="Subscribe ..."
                            />
                            <FontAwesomeIcon icon={faPaperPlane} className="news-icon" />
                        </label>
                    </div>
                    <div className="ft-one">
                        <h5>Categories</h5>
                        <ul>
                            {uniqueCategories.map((category, index) => (
                                <li key={index} onClick={() => handleCategoryClick(category)}>
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;