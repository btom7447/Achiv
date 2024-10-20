import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = ({ onClose, onPrevent }) => {
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        // Add your email submission logic here
    };

    return (
        <div className="signup-container">
            <div className="overlay">
                <div className="signup">
                    <img src="https://zoya.qodeinteractive.com/wp-content/uploads/2021/04/popup-img-2.jpg" alt="sign up poster" />
                    <div className="signup-texts">
                        <button type="button" onClick={onClose} className="close">&times;</button>
                        <h3>Sign up for Zoya Newsletter</h3>
                        <p>
                            Subscribe to our newsletter to find out about our latest posts & updates
                        </p>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="newsletter">
                                <input 
                                    type="email" 
                                    name="newsletter" 
                                    id="newsletter" 
                                    placeholder="Subscribe ..."
                                />
                                <button type="submit">
                                    <FontAwesomeIcon icon={faPaperPlane} className="news-icon" />
                                </button>
                            </label>
                            <div>
                            <label className="container">
                                <input type="checkbox" name="prevent" id="prevent" onChange={onPrevent} />
                                <svg viewBox="0 0 64 64" height="2em" width="2em">
                                    <path 
                                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                        pathLength="575.0541381835938"
                                        className="path"
                                    />
                                </svg>
                            </label>
                                <p>Prevent This Pop-up</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}; 

export default Signup;