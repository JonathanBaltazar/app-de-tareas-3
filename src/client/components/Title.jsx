import React from "react";

function Title({ titleName, align_left = false }) {
    return (
        <h1
            className={`${
                align_left ? "text-left" : "text-center"
            } text-4xl font-medium mb-4 dark:text-white`}
        >
            {titleName}
        </h1>
    );
}

export default Title;
