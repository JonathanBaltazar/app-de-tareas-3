import React from "react";

function Card({ children, page = "" }) {
    let marginTop = page == "form" ? "mt-10" : "mt-0";
    let cardWidth = page == "form" ? "w-1/3" : "w-1/2";
    return (
        <div
            className={`p-4 rounded-md ${marginTop} drop-shadow-2xl w-11/12 sm:w-10/12 md:w-3/4 lg:${cardWidth} mx-auto bg-white dark:bg-neutral-800`}
        >
            {children}
        </div>
    );
}

export default Card;
