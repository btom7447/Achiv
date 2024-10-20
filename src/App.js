import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Footer from './Components/Footer';
import Header from './Components/Header';
import AboutPage from './Pages/AboutPage';
import Utilities from './Components/Utilities';
import BlogPost from './Pages/BlogPost';
import Blogs from './Pages/Blogs';
import Signup from './Components/Signup';
import ContactPage from "./Pages/ContactPage";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [preventPopup, setPreventPopup] = useState(false);

    useEffect(() => {
        // Set a timer to show the popup after a specified time (e.g., 10 seconds)
        const timer = setTimeout(() => {
            if (!preventPopup) {
                setShowSignup(true);
            }
        }, 60000); // Adjust the time as needed (10000ms = 10 seconds)

        return () => clearTimeout(timer);
    }, [preventPopup]);

    const handleClose = () => {
      setShowSignup(false);
    };
 
  return (
    <div className="app">
       <Router>
        <ScrollToTop />
        <Header />
        <Routes>  
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog-post/:slug" element={<BlogPost />} />
        </Routes>
        <Utilities />
        <Footer />
        {showSignup && <Signup onClose={handleClose} onPrevent={() => setPreventPopup(true)} />}
      </Router>
    </div>
  );
}

export default App;
