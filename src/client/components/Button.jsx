import React from "react";

function Button({ nameButton, type = "button", color = "bg-neutral-900" }) {
    return (
        <button
            type={type}
            className={`px-4 py-2 my-2 ${color} text-white rounded-md text-center dark:text-black dark:bg-neutral-100`}
        >
            {nameButton}
        </button>
    );
}

export default Button;
