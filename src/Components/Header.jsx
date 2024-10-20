import React from "react";
import Navbar from "./Navbar";
import SearchHeader from "./SearchHeader";
import TopHeader from "./TopHeader";

const Header = () => {
    return (
        <div className="header">
            <TopHeader />
            <Navbar />
            <SearchHeader />
        </div>
    )
};

export default Header;