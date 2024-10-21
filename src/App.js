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
import AdminPost from "./Pages/AdminPost";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminBlog from "./Pages/AdminBlog";
import EditBlogCard from "./Components/EditBlogCard";

const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [preventPopup, setPreventPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!preventPopup) {
                setShowSignup(true);
            }
        }, 60000); // Show signup popup after 60 seconds

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
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog-post/:title" element={<BlogPost />} />
          
          {/* Admin Routes under /admin subdirectory */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/blogs" element={<AdminBlog />} />
          <Route path="/admin/blog-post/:title" element={<EditBlogCard />} />

          <Route path="/admin/posts" element={<AdminPost />} />
        </Routes>
        <Utilities />
        <Footer />
        {showSignup && <Signup onClose={handleClose} onPrevent={() => setPreventPopup(true)} />}
      </Router>
    </div>
  );
}

export default App;