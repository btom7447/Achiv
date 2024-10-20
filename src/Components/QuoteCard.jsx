import React from "react";

const QuoteCard = ({ quote }) => {
    return (
        <div className="quote-card">
            <span className="quote">"</span>
            <h3>{quote.text}</h3>
            <p>{quote.author}</p>
        </div>
    );
};

export default QuoteCard;