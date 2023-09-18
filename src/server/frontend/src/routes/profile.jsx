import React from "react";
import axios from "../api/axios";

function Profile() {
    let getProfile = async () => {
        let response = await axios.get("/profile");
    };

    getProfile();
    return <div>Profile</div>;
}

export default Profile;
