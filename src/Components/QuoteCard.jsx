import React from "react";

const QuoteCard = ({ quote, dataAos }) => {
    return (
        <div className="quote-card" data-aos={dataAos}> {/* AOS animation attribute */}
            <span className="quote">"</span>
            <h3>{quote.text}</h3>
            <p>{quote.author}</p>
        </div>
    );
};

export default QuoteCard;